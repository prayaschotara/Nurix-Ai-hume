export interface Agent {
    id: string;
    name: string;
    role: string;
    avatar: string;
    features: string[];
    supportChat: boolean;
    supportCall: boolean;
    description?: string;
    category: 'restaurant' | 'insurance' | 'phone' | 'car_accessories';
    humeAgentId?: string;
  }
  
  export const HUME_RESTAURANT_AGENT_ID =
    process.env.NEXT_PUBLIC_HUME_RESTAURANT_AGENT_ID || 'restaurant-concierge';
  export const HUME_INSURANCE_AGENT_ID = process.env.NEXT_PUBLIC_HUME_INSURANCE_AGENT_ID || 'insurance-concierge';
  export const HUME_PHONE_AGENT_ID = process.env.NEXT_PUBLIC_HUME_PHONE_AGENT_ID || 'phone-concierge';
  export const HUME_CAR_ACCESSORIES_AGENT_ID = process.env.NEXT_PUBLIC_HUME_CAR_ACCESSORIES_AGENT_ID || 'car-accessories-concierge';

  export const Agent: Agent[] = [
    {
      id: 'rest-001',
      name: 'Sofia',
      role: 'Restaurant Concierge',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia',
      features: ['Table reservations', 'Menu recommendations'],
      supportCall: true,
      supportChat: false,
      category: 'restaurant',
      humeAgentId: HUME_RESTAURANT_AGENT_ID
    },

    {
      id: 'ins-001',
      name: 'Insurance Concierge',
      role: 'Insurance Concierge',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Insurance',
      features: ['Insurance quotes', 'Claims assistance'],
      supportCall: true,
      supportChat: false,
      category: 'insurance',
      humeAgentId: HUME_INSURANCE_AGENT_ID
    },
    {
      id: 'phone-001',
      name: 'Phone Concierge',
      role: 'Phone Concierge',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Phone',
      features: ['Phone support', 'Phone assistance'],
      supportCall: true,
      supportChat: false,
      category: 'phone',
      humeAgentId: HUME_PHONE_AGENT_ID
    },
    {
      id: 'car-001',
      name: 'Car Accessories Concierge',
      role: 'Car Accessories Concierge',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Car',
      features: ['Car accessories', 'Car accessories assistance'],
      supportCall: true,
      supportChat: false,
      category: 'car_accessories',
      humeAgentId: HUME_CAR_ACCESSORIES_AGENT_ID
    }
  ];
  