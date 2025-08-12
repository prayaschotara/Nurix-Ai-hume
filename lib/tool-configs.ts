/**
 * Tool configurations for Hume AI dashboard
 * Copy these JSON schemas when creating tools in the Hume portal
 */

export const HUME_TOOL_CONFIGS = {
  // Restaurant Agent Tools
  restaurant: {
    getMenu: {
      name: "getMenu",
      description: "Get the restaurant's current menu with prices, descriptions, and categories",
      parameters: {
        "type": "object",
        "properties": {},
        "required": []
      }
    },
    
    createReservation: {
      name: "createReservation",
      description: "Create a dining reservation with party size, date, time, and special requests",
      parameters: {
        "type": "object",
        "properties": {
          "party_size": {
            "type": "integer",
            "description": "Number of people for the reservation"
          },
          "date": {
            "type": "string",
            "description": "Reservation date in YYYY-MM-DD format"
          },
          "time": {
            "type": "string",
            "description": "Reservation time in HH:MM format"
          },
          "special_requests": {
            "type": "string",
            "description": "Any special dietary requirements or requests"
          }
        },
        "required": ["party_size", "date", "time"]
      }
    }
  },

  // Future agent tools can be added here
  insurance: {
    // getInsuranceQuote: { ... }
  },
  
  phone: {
    // getPhoneRecommendation: { ... }
  },
  
  car_accessories: {
    // getAccessoryRecommendation: { ... }
  }
};

/**
 * Get tool config for a specific agent type
 */
export function getToolConfig(agentType: string) {
  return HUME_TOOL_CONFIGS[agentType as keyof typeof HUME_TOOL_CONFIGS] || {};
}

/**
 * Get all available tool names for an agent type
 */
export function getAvailableToolNames(agentType: string): string[] {
  const config = getToolConfig(agentType);
  return Object.keys(config);
}



