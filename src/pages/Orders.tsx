import { useState } from "react";
import { Search, Eye, MoreVertical, Printer, Phone, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allOrders, Order } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { OrderDetailsModal } from "@/components/dashboard/OrderDetailsModal";

const statusConfig = {
  new: { label: "New", color: "bg-warning/10 text-warning border-warning" },
  preparing: { label: "Preparing", color: "bg-info/10 text-info border-info" },
  ready: { label: "Ready", color: "bg-success/10 text-success border-success" },
  picked_up: { label: "Picked Up", color: "bg-chart-5/10 text-chart-5 border-chart-5" },
  delivered: { label: "Delivered", color: "bg-success/10 text-success border-success" },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive border-destructive" },
};

export default function Orders() {
  const [orders] = useState(allOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatTime = (time: string) => {
    return new Date(time).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage and track all your orders</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Order ID or Customer Name"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="picked_up">Picked Up</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button>Apply</Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Phone</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Items</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Order Time</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-5 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <span className="text-sm font-medium text-foreground">{order.id}</span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-foreground">{order.customerName}</span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-muted-foreground">{order.customerPhone}</span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-muted-foreground">{order.items.length} items</span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm font-medium text-foreground">₹{order.total}</span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-muted-foreground">{formatTime(order.orderTime)}</span>
                    </td>
                    <td className="py-3 px-5">
                      <Badge
                        variant="outline"
                        className={cn("text-xs", statusConfig[order.status].color)}
                      >
                        {statusConfig[order.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card">
                            <DropdownMenuItem>
                              <Printer className="w-4 h-4 mr-2" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="w-4 h-4 mr-2" />
                              Contact Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Report Issue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </DashboardLayout>
  );
}
