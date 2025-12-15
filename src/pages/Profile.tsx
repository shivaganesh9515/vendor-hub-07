import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vendorInfo, bankDetails, storeTimings as initialTimings, categories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  
  const [businessInfo, setBusinessInfo] = useState({
    storeName: vendorInfo.name,
    ownerName: vendorInfo.ownerName,
    category: vendorInfo.category,
    address: vendorInfo.address,
    city: vendorInfo.city,
    pincode: vendorInfo.pincode,
    state: vendorInfo.state,
    phone: vendorInfo.phone,
    email: vendorInfo.email,
    gst: vendorInfo.gst,
    fssai: vendorInfo.fssai,
  });

  const [bank, setBank] = useState({
    accountHolder: bankDetails.accountHolder,
    accountNumber: "",
    bankName: bankDetails.bankName,
    ifsc: bankDetails.ifsc,
    branch: bankDetails.branch,
  });

  const [timings, setTimings] = useState(initialTimings);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleUpdateBusiness = () => {
    toast({ title: "Business Information Updated", description: "Your business details have been saved." });
  };

  const handleUpdateBank = () => {
    toast({ title: "Bank Details Updated", description: "Your bank information has been saved." });
  };

  const handleUpdateTimings = () => {
    toast({ title: "Store Timings Updated", description: "Your operating hours have been saved." });
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (passwords.new.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }
    toast({ title: "Password Changed", description: "Your password has been updated successfully." });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleTimingChange = (index: number, field: string, value: string | boolean) => {
    setTimings((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your business and account settings</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Information */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Business Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input
                  value={businessInfo.storeName}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, storeName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Owner Name</Label>
                <Input
                  value={businessInfo.ownerName}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, ownerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Store Category</Label>
                <Select
                  value={businessInfo.category}
                  onValueChange={(v) => setBusinessInfo({ ...businessInfo, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                    <SelectItem value="Fruits & Vegetables">Fruits & Vegetables</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Store Address</Label>
                <Textarea
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={businessInfo.city}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input
                    value={businessInfo.pincode}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, pincode: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={businessInfo.state}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, state: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={businessInfo.email}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>GST Number</Label>
                <Input
                  value={businessInfo.gst}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, gst: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>FSSAI License No.</Label>
                <Input
                  value={businessInfo.fssai}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, fssai: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleUpdateBusiness}>
                Update Information
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Bank Details */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Bank Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Account Holder Name</Label>
                  <Input
                    value={bank.accountHolder}
                    onChange={(e) => setBank({ ...bank, accountHolder: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input
                    type="password"
                    placeholder="Enter account number"
                    value={bank.accountNumber}
                    onChange={(e) => setBank({ ...bank, accountNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input
                    value={bank.bankName}
                    onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>IFSC Code</Label>
                  <Input
                    value={bank.ifsc}
                    onChange={(e) => setBank({ ...bank, ifsc: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Branch Name</Label>
                  <Input
                    value={bank.branch}
                    onChange={(e) => setBank({ ...bank, branch: e.target.value })}
                  />
                </div>
                <Button className="w-full" onClick={handleUpdateBank}>
                  Update Bank Details
                </Button>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  />
                </div>
                <Button variant="secondary" className="w-full" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Store Timings */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Store Timings</h3>
          <div className="space-y-3">
            {timings.map((timing, index) => (
              <div
                key={timing.day}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg bg-muted/30"
              >
                <div className="w-24 font-medium text-foreground">{timing.day}</div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={timing.isOpen}
                    onCheckedChange={(c) => handleTimingChange(index, "isOpen", c)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {timing.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
                {timing.isOpen && (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={timing.openTime}
                      onChange={(e) => handleTimingChange(index, "openTime", e.target.value)}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={timing.closeTime}
                      onChange={(e) => handleTimingChange(index, "closeTime", e.target.value)}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <Button className="mt-4" onClick={handleUpdateTimings}>
            Save Timings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
