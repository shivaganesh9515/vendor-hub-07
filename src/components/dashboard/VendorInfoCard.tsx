import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { vendorInfo } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function VendorInfoCard() {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">
            {vendorInfo.logo}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {vendorInfo.name}
            </h2>
            <p className="text-sm text-muted-foreground">{vendorInfo.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <Star className="w-5 h-5 fill-warning text-warning" />
            <span className="text-lg font-semibold text-foreground">
              {vendorInfo.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({vendorInfo.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "text-sm font-medium px-3 py-1",
              vendorInfo.status === "active"
                ? "border-success text-success bg-success/10"
                : "border-warning text-warning bg-warning/10"
            )}
          >
            {vendorInfo.status === "active" ? "Active" : "Pending Approval"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
