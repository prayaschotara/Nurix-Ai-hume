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


