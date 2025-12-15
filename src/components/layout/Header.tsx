import { useState } from "react";
import { Bell, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { vendorInfo, notifications } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Header() {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const unreadCount = notificationsList.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return "🛒";
      case "alert":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📌";
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Vendor Name */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-foreground">
          {vendorInfo.name}
        </h1>
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-medium",
            vendorInfo.status === "active"
              ? "border-success text-success bg-success/10"
              : "border-warning text-warning bg-warning/10"
          )}
        >
          {vendorInfo.status === "active" ? "Active" : "Pending Approval"}
        </Badge>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 bg-card border-border"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <ScrollArea className="h-80">
              <div className="py-2">
                {notificationsList.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer",
                      !notification.isRead && "bg-primary/5"
                    )}
                  >
                    <span className="text-lg flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <span className="w-2 h-2 bg-info rounded-full mt-1.5 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t border-border px-4 py-2">
              <button className="text-sm text-primary hover:underline w-full text-center">
                View All
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {vendorInfo.ownerName}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
