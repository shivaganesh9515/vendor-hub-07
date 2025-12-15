import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activeOrders, Order } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { OrderDetailsModal } from "./OrderDetailsModal";

const statusColors = {
  preparing: "bg-info/10 text-info border-info",
  ready: "bg-success/10 text-success border-success",
  picked_up: "bg-chart-5/10 text-chart-5 border-chart-5",
};

const statusLabels = {
  preparing: "Preparing",
  ready: "Ready",
  picked_up: "Picked Up",
};

export function ActiveOrdersTable() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(activeOrders);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "ready" as const, readyTime: new Date().toISOString() }
          : o
      )
    );
    toast({
      title: "Order Updated",
      description: `Order ${orderId} is now ready for pickup.`,
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const getTimeAgo = (orderTime: string) => {
    const now = new Date();
    const orderDate = new Date(orderTime);
    const diffMs = now.getTime() - orderDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <>
      <div className="bg-card rounded-xl shadow-card border border-border/50 animate-fade-in">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Active Orders
            </h3>
            <p className="text-sm text-muted-foreground">
              Orders currently being processed
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-muted">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="preparing" className="text-xs">
                Preparing
              </TabsTrigger>
              <TabsTrigger value="ready" className="text-xs">
                Ready
              </TabsTrigger>
              <TabsTrigger value="picked_up" className="text-xs">
                Picked Up
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                  Order ID
                </th>
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                  Items
                </th>
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                  Time
                </th>
                <th className="text-right py-3 px-5 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.slice(0, 8).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="py-3 px-5">
                    <span className="text-sm font-medium text-foreground">
                      {order.id}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-sm text-foreground">
                      {order.customerName}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-sm text-muted-foreground">
                      {order.items.length} items
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-sm font-medium text-foreground">
                      ₹{order.total}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        statusColors[order.status as keyof typeof statusColors]
                      )}
                    >
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </Badge>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-sm text-muted-foreground">
                      {getTimeAgo(order.orderTime)}
                    </span>
                  </td>
                  <td className="py-3 px-5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      {order.status === "preparing" && (
                        <Button
                          size="sm"
                          className="h-8 px-3 text-xs"
                          onClick={() => handleMarkReady(order.id)}
                        >
                          Mark Ready
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="link"
                        className="h-8 px-2 text-xs text-primary"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
