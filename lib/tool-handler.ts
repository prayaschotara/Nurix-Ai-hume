import { TOOL_REGISTRY, ToolDefinition } from '../types/hume';
import { HumeToolCallMessage, HumeToolResponseMessage, HumeToolErrorMessage } from '../types/hume';

export class ToolHandler {
  private agentType: string;

  constructor(agentType: string) {
    this.agentType = agentType;
  }

  async handleToolCall(toolCall: HumeToolCallMessage): Promise<HumeToolResponseMessage | HumeToolErrorMessage> {
    try {
      console.log('🔧 Tool call received:', toolCall.name);
      
      // Find tool definition
      const toolDef = TOOL_REGISTRY[toolCall.name];
      if (!toolDef) {
        return this.createToolError(toolCall.tool_call_id, 'Tool not found', `Tool '${toolCall.name}' is not available`);
      }

      // Check agent compatibility
      if (toolDef.agentType !== this.agentType) {
        return this.createToolError(toolCall.tool_call_id, 'Tool not available', `Tool '${toolCall.name}' is not available for ${this.agentType} agent`);
      }

      // Execute the tool
      const result = await this.executeTool(toolDef, toolCall);
      
      // Return success response
      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: JSON.stringify(result)
      };

    } catch (error) {
      console.error('❌ Tool execution failed:', error);
      return this.createToolError(
        toolCall.tool_call_id, 
        'Execution failed', 
        `Failed to execute tool '${toolCall.name}': ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async executeTool(toolDef: ToolDefinition, toolCall: HumeToolCallMessage): Promise<unknown> {
    const { endpoint, method } = toolDef;
    
    // Build request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Add body for POST requests
    if (method === 'POST' && toolCall.parameters) {
      try {
        const params = JSON.parse(toolCall.parameters);
        requestOptions.body = JSON.stringify(params);
      } catch {
        throw new Error(`Invalid parameters format: ${toolCall.parameters}`);
      }
    }

    console.log(`🌐 Calling ${method} ${endpoint}`);
    
    // Make the actual API call
    const response = await fetch(endpoint, requestOptions);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Tool execution result:', result);
    return result;
  }

  private createToolError(toolCallId: string, errorType: string, errorMessage: string): HumeToolErrorMessage {
    return {
      type: 'tool_error',
      tool_call_id: toolCallId,
      error: `${errorType}: ${errorMessage}`,
      content: errorMessage
    };
  }

  getAvailableTools(): string[] {
    return Object.keys(TOOL_REGISTRY).filter(toolName => {
      const toolDef = TOOL_REGISTRY[toolName];
      return toolDef.agentType === this.agentType;
    });
  }
}

export function createToolHandler(agentType: string): ToolHandler {
  return new ToolHandler(agentType);
}



