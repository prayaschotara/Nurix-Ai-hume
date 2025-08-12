import { TOOL_REGISTRY, ToolDefinition, HumeToolCallMessage, HumeToolResponseMessage, HumeToolErrorMessage } from '../types/hume';

export class ToolHandler {
  private agentType: string;

  constructor(agentType: string) {
    this.agentType = agentType;
  }

  /**
   * Handle a tool call from Hume AI
   */
  async handleToolCall(toolCall: HumeToolCallMessage): Promise<HumeToolResponseMessage | HumeToolErrorMessage> {
    try {
      console.log('🔧 Tool call received:', toolCall.name);
      
      // Get tool definition
      const toolDef = TOOL_REGISTRY[toolCall.name];
      if (!toolDef) {
        return this.createToolError(toolCall.tool_call_id, 'Tool not found', `Tool '${toolCall.name}' is not available`);
      }

      // Check if tool is available for this agent type
      if (toolDef.agentType !== this.agentType) {
        return this.createToolError(toolCall.tool_call_id, 'Tool not available', `Tool '${toolCall.name}' is not available for ${this.agentType} agent`);
      }

      // Execute the tool
      const result = await this.executeTool(toolDef, toolCall);
      
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

  /**
   * Execute a specific tool
   */
  private async executeTool(toolDef: ToolDefinition, toolCall: HumeToolCallMessage): Promise<any> {
    const { endpoint, method } = toolDef;
    
    let requestOptions: RequestInit = {
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
      } catch (e) {
        throw new Error(`Invalid parameters format: ${toolCall.parameters}`);
      }
    }

    console.log(`🌐 Calling ${method} ${endpoint}`);
    const response = await fetch(endpoint, requestOptions);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Tool execution result:', result);
    return result;
  }

  /**
   * Create a tool error response
   */
  private createToolError(toolCallId: string, error: string, content: string): HumeToolErrorMessage {
    return {
      type: 'tool_error',
      tool_call_id: toolCallId,
      error,
      content,
      level: 'warn'
    };
  }

  /**
   * Get available tools for this agent type
   */
  getAvailableTools(): ToolDefinition[] {
    return Object.values(TOOL_REGISTRY).filter(tool => tool.agentType === this.agentType);
  }
}

/**
 * Factory function to create tool handler for specific agent type
 */
export function createToolHandler(agentType: string): ToolHandler {
  return new ToolHandler(agentType);
}



