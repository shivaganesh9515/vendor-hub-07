import { useState } from "react";
import { ShoppingBag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { newOrders, Order } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { OrderDetailsModal } from "./OrderDetailsModal";

export function NewOrdersTable() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(newOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleAccept = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    toast({
      title: "Order Accepted",
      description: `Order ${orderId} has been accepted and moved to active orders.`,
    });
  };

  const handleReject = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    toast({
      title: "Order Rejected",
      description: `Order ${orderId} has been rejected.`,
      variant: "destructive",
    });
  };

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

  if (orders.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-border/50 animate-fade-in">
        <div className="p-5 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">New Orders</h3>
          <p className="text-sm text-muted-foreground">
            Orders waiting for your confirmation
          </p>
        </div>
        <div className="p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No new orders right now</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-xl shadow-card border border-border/50 animate-fade-in">
        <div className="p-5 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">New Orders</h3>
          <p className="text-sm text-muted-foreground">
            Orders waiting for your confirmation
          </p>
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
                  Type
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
              {orders.slice(0, 6).map((order) => (
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
                        order.deliveryType === "delivery"
                          ? "border-info text-info"
                          : "border-primary text-primary"
                      )}
                    >
                      {order.deliveryType === "delivery"
                        ? "Home Delivery"
                        : "Pickup"}
                    </Badge>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-sm text-muted-foreground">
                      {getTimeAgo(order.orderTime)}
                    </span>
                  </td>
                  <td className="py-3 px-5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        className="h-9 px-4"
                        onClick={() => handleAccept(order.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 px-4 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleReject(order.id)}
                      >
                        Reject
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
