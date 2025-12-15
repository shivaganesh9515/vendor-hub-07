import { ShoppingBag, IndianRupee, Package, Star } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VendorInfoCard } from "@/components/dashboard/VendorInfoCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NewOrdersTable } from "@/components/dashboard/NewOrdersTable";
import { ActiveOrdersTable } from "@/components/dashboard/ActiveOrdersTable";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { dashboardMetrics } from "@/data/mockData";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Vendor Info */}
        <VendorInfoCard />

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Today's Orders"
            value={dashboardMetrics.todaysOrders}
            subtitle="Active orders"
            icon={ShoppingBag}
          />
          <MetricCard
            title="Today's Revenue"
            value={`₹${dashboardMetrics.todaysRevenue.toLocaleString()}`}
            subtitle="Total earnings today"
            trend={{
              value: `+${dashboardMetrics.revenueChange}% from yesterday`,
              isPositive: true,
            }}
            icon={IndianRupee}
          />
          <MetricCard
            title="Total Products"
            value={dashboardMetrics.totalProducts}
            subtitle="Listed products"
            icon={Package}
          />
          <MetricCard
            title="Customer Rating"
            value={`${dashboardMetrics.customerRating}/5`}
            subtitle={`Based on ${dashboardMetrics.totalReviews.toLocaleString()} reviews`}
            icon={Star}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Orders Section */}
          <div className="xl:col-span-3 space-y-6">
            <NewOrdersTable />
            <ActiveOrdersTable />
          </div>

          {/* Low Stock Sidebar */}
          <div className="xl:col-span-1">
            <LowStockAlert />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
