"use client";

import React from "react";
import { restaurantAgents } from "../types/agent";
import HumeAgentCard from "./HumeAgentCard";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function RestaurantAgents() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-amber-50 rounded-2xl mb-4">
            <BuildingStorefrontIcon className="w-6 h-6 text-amber-500 mr-2" />
            <span className="text-amber-700 font-medium">Dining Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Restaurant Reservations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI agent can help you reserve a table, get menu information, and
            handle special dietary requests to ensure your dining experience is
            exceptional.
          </p>
        </div>

        <div className="mx-auto">
          {restaurantAgents.map((agent) => (
            <HumeAgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
