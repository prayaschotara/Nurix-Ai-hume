export interface HumeAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  features: string[];
  supportCall: boolean;
  supportChat: boolean;
  description?: string;
  category: 'restaurant';
  humeAgentId: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isBestSelling: boolean;
  imageUrl: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReservationRequest {
  customerName: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
}

export interface ReservationResponse {
  status: string;
  message: string;
  reservation_id: string;
}

export interface HumeCallSession {
  sessionId: string;
  agentId: string;
  status: 'connecting' | 'connected' | 'ended' | 'error';
  startTime?: Date;
  endTime?: Date;
}

// Hume AI specific types
export interface HumeToolCall {
  name: string;
  arguments: Record<string, any>;
}

export interface HumeMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  tool_calls?: HumeToolCall[];
}

export interface HumeConversation {
  messages: HumeMessage[];
  tools: {
    name: string;
    description: string;
    parameters: Record<string, any>;
  }[];
}

// Tool calling interfaces
export interface HumeToolCallMessage {
  type: 'tool_call';
  name: string;
  parameters: string; // JSON string
  tool_call_id: string;
  response_required: boolean;
  tool_type?: 'function' | 'builtin';
}

export interface HumeToolResponseMessage {
  type: 'tool_response';
  tool_call_id: string;
  content: string;
}

export interface HumeToolErrorMessage {
  type: 'tool_error';
  tool_call_id: string;
  error: string;
  content: string;
  level?: 'warn' | 'error';
}

// Tool definitions for different agent types
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
  endpoint: string;
  method: 'GET' | 'POST';
  agentType: 'restaurant' | 'insurance' | 'phone' | 'car_accessories';
}

// Tool registry for all agents
export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
  // Restaurant tools
  getMenu: {
    name: 'getMenu',
    description: 'Get the restaurant\'s current menu with prices, descriptions, and categories',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    },
    endpoint: 'http://localhost:3000/api/getMenu',
    method: 'POST',
    agentType: 'restaurant'
  },
  
  createReservation: {
    name: 'createReservation',
    description: 'Create a dining reservation with party size, date, time, and special requests',
    parameters: {
      type: 'object',
      properties: {
        party_size: {
          type: 'integer',
          description: 'Number of people for the reservation'
        },
        date: {
          type: 'string',
          description: 'Reservation date in YYYY-MM-DD format'
        },
        time: {
          type: 'string',
          description: 'Reservation time in HH:MM format'
        },
        special_requests: {
          type: 'string',
          description: 'Any special dietary requirements or requests'
        }
      },
      required: ['party_size', 'date', 'time']
    },
    endpoint: 'http://localhost:3000/api/reservation',
    method: 'POST',
    agentType: 'restaurant'
  },

  // Future tools can be added here
  // Example for insurance agent:
  // getInsuranceQuote: {
  //   name: 'getInsuranceQuote',
  //   description: 'Get insurance quote based on user details',
  //   parameters: { ... },
  //   endpoint: 'http://localhost:3000/insurance/quote',
  //   method: 'POST',
  //   agentType: 'insurance'
  // }
};


