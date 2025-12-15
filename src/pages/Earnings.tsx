import { IndianRupee, TrendingUp, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { payouts, earningsData } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function Earnings() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalEarnings = 145680;
  const thisMonth = 42350;
  const monthChange = 15;
  const pendingSettlement = 8450;

  const totalPages = Math.ceil(payouts.length / itemsPerPage);
  const paginatedPayouts = payouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
          <p className="text-muted-foreground">Track your revenue and payouts</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ₹{totalEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">All time earnings</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ₹{thisMonth.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">This month</p>
                <p className="text-xs text-success font-medium mt-1">
                  +{monthChange}% from last month
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ₹{pendingSettlement.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Pending settlement</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Will be settled on 20th
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Earnings Trend
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number) => [`₹${value}`, "Earnings"]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              Payout History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Payout ID
                  </th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Period
                  </th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Orders
                  </th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Gross Amount
                  </th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Commission
                  </th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Net Amount
                  </th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">
                    Settlement
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayouts.map((payout) => (
                  <tr
                    key={payout.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <span className="text-sm font-medium text-foreground">
                        {payout.id}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-foreground">
                        {payout.period}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-muted-foreground">
                        {payout.totalOrders}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-foreground">
                        ₹{payout.grossAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-destructive">
                        -₹{payout.commission.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm font-semibold text-foreground">
                        ₹{payout.netAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          payout.status === "settled"
                            ? "bg-success/10 text-success border-success"
                            : "bg-warning/10 text-warning border-warning"
                        )}
                      >
                        {payout.status === "settled" ? "Settled" : "Pending"}
                      </Badge>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-muted-foreground">
                        {payout.settlementDate}
                      </span>
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
              {Math.min(currentPage * itemsPerPage, payouts.length)} of{" "}
              {payouts.length} payouts
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
    </DashboardLayout>
  );
}
