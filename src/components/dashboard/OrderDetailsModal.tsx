import { X, Phone, Printer, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

const statusConfig = {
  new: { label: "New", color: "bg-warning/10 text-warning border-warning" },
  preparing: { label: "Preparing", color: "bg-info/10 text-info border-info" },
  ready: { label: "Ready", color: "bg-success/10 text-success border-success" },
  picked_up: {
    label: "Picked Up",
    color: "bg-chart-5/10 text-chart-5 border-chart-5",
  },
  delivered: {
    label: "Delivered",
    color: "bg-success/10 text-success border-success",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-destructive/10 text-destructive border-destructive",
  },
};

const statusSteps = [
  { key: "orderTime", label: "Order Placed" },
  { key: "acceptedTime", label: "Accepted by Vendor" },
  { key: "preparingTime", label: "Preparing" },
  { key: "readyTime", label: "Ready for Pickup" },
  { key: "pickedUpTime", label: "Picked Up" },
  { key: "deliveredTime", label: "Delivered" },
];

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const formatTime = (time?: string) => {
    if (!time) return null;
    return new Date(time).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStepStatus = (stepKey: string) => {
    const stepIndex = statusSteps.findIndex((s) => s.key === stepKey);
    const orderValue = order[stepKey as keyof Order];

    if (orderValue) return "completed";

    // Check if previous step is completed
    if (stepIndex > 0) {
      const prevStepKey = statusSteps[stepIndex - 1].key;
      const prevValue = order[prevStepKey as keyof Order];
      if (prevValue && !orderValue) {
        // Current step based on status
        if (order.status === "new" && stepKey === "acceptedTime") return "current";
        if (order.status === "preparing" && stepKey === "preparingTime")
          return "current";
        if (order.status === "ready" && stepKey === "readyTime") return "current";
        if (order.status === "picked_up" && stepKey === "pickedUpTime")
          return "current";
      }
    }

    return "pending";
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-card">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-lg font-semibold">
                {order.id}
              </DialogTitle>
              <Badge
                variant="outline"
                className={cn("text-xs", statusConfig[order.status].color)}
              >
                {statusConfig[order.status].label}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Ordered on {formatTime(order.orderTime)}
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Customer Information
              </h4>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Name: </span>
                  <span className="font-medium">{order.customerName}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Phone: </span>
                  <span className="font-medium">{order.customerPhone}</span>
                </p>
                {order.customerAddress && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Address: </span>
                    <span className="font-medium">{order.customerAddress}</span>
                  </p>
                )}
                {order.deliveryInstructions && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Instructions: </span>
                    <span className="font-medium">
                      {order.deliveryInstructions}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Items */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Order Items
              </h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                        Item
                      </th>
                      <th className="text-center py-2 px-4 text-xs font-medium text-muted-foreground">
                        Qty
                      </th>
                      <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="border-t border-border">
                        <td className="py-2 px-4 text-sm">{item.name}</td>
                        <td className="py-2 px-4 text-sm text-center">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-2 px-4 text-sm text-right">
                          ₹{item.pricePerUnit}
                        </td>
                        <td className="py-2 px-4 text-sm text-right font-medium">
                          ₹{item.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              {order.deliveryCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span>₹{order.deliveryCharge}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>

            {/* Status Timeline */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Order Timeline
              </h4>
              <div className="space-y-4">
                {statusSteps.map((step, idx) => {
                  const status = getStepStatus(step.key);
                  const time = order[step.key as keyof Order] as string | undefined;

                  return (
                    <div key={step.key} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        {status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : status === "current" ? (
                          <Circle className="w-5 h-5 text-info fill-info/20" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground/30" />
                        )}
                        {idx < statusSteps.length - 1 && (
                          <div
                            className={cn(
                              "w-0.5 h-6 mt-1",
                              status === "completed"
                                ? "bg-success"
                                : "bg-muted-foreground/20"
                            )}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            status === "pending"
                              ? "text-muted-foreground"
                              : "text-foreground"
                          )}
                        >
                          {step.label}
                        </p>
                        {time && (
                          <p className="text-xs text-muted-foreground">
                            {formatTime(time)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row gap-2">
          {order.status === "preparing" && (
            <Button className="flex-1">Mark as Ready</Button>
          )}
          <Button variant="outline" className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Contact Customer
          </Button>
          <Button variant="outline" className="flex-1">
            <Printer className="w-4 h-4 mr-2" />
            Print Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
