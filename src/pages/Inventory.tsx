import { useState } from "react";
import { Package, AlertTriangle, XCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { products as initialProducts, Product } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Inventory() {
  const { toast } = useToast();
  const [productsList, setProductsList] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockMode, setStockMode] = useState<"add" | "set">("add");
  const [stockValue, setStockValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalItems = productsList.length;
  const lowStockItems = productsList.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockItems = productsList.filter((p) => p.stock === 0).length;

  const sortedProducts = [...productsList].sort((a, b) => a.stock - b.stock);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setStockValue("");
    setStockMode("add");
    setIsModalOpen(true);
  };

  const handleUpdateStock = () => {
    if (!selectedProduct || !stockValue) return;

    const value = parseInt(stockValue);
    if (isNaN(value) || value < 0) {
      toast({ title: "Error", description: "Please enter a valid stock value.", variant: "destructive" });
      return;
    }

    setProductsList((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              stock: stockMode === "add" ? p.stock + value : value,
              lastUpdated: new Date().toISOString(),
            }
          : p
      )
    );

    toast({ title: "Stock Updated", description: `Stock for ${selectedProduct.name} has been updated.` });
    setIsModalOpen(false);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-destructive/10 text-destructive border-destructive" };
    if (stock <= 5) return { label: "Low Stock", color: "bg-warning/10 text-warning border-warning" };
    return { label: "In Stock", color: "bg-success/10 text-success border-success" };
  };

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
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground">Monitor and update your stock levels</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalItems}</p>
                <p className="text-sm text-muted-foreground">Products in catalog</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className={cn("text-2xl font-bold", lowStockItems > 0 ? "text-warning" : "text-foreground")}>
                  {lowStockItems}
                </p>
                <p className="text-sm text-muted-foreground">Need restocking</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className={cn("text-2xl font-bold", outOfStockItems > 0 ? "text-destructive" : "text-foreground")}>
                  {outOfStockItems}
                </p>
                <p className="text-sm text-muted-foreground">Currently unavailable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Current Stock</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Unit</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Last Updated</th>
                  <th className="text-right py-3 px-5 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => {
                  const status = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-xl">
                            {product.image}
                          </div>
                          <span className="text-sm font-medium text-foreground">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                      </td>
                      <td className="py-3 px-5">
                        <span className={cn("text-sm font-semibold", product.stock === 0 ? "text-destructive" : product.stock <= 5 ? "text-warning" : "text-foreground")}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <span className="text-sm text-muted-foreground">{product.unit}</span>
                      </td>
                      <td className="py-3 px-5">
                        <Badge variant="outline" className={cn("text-xs", status.color)}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-5">
                        <span className="text-sm text-muted-foreground">{formatTime(product.lastUpdated)}</span>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleOpenModal(product)}>
                            Update Stock
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of{" "}
              {sortedProducts.length} products
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Stock Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md bg-card">
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-2xl">{selectedProduct.image}</span>
                <div>
                  <p className="font-medium text-foreground">{selectedProduct.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Current stock: {selectedProduct.stock} {selectedProduct.unit}
                  </p>
                </div>
              </div>

              <RadioGroup value={stockMode} onValueChange={(v) => setStockMode(v as "add" | "set")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add" id="add" />
                  <Label htmlFor="add">Add to current stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="set" id="set" />
                  <Label htmlFor="set">Set new stock value</Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label>{stockMode === "add" ? "Quantity to add" : "New stock value"}</Label>
                <Input
                  type="number"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                  placeholder="Enter quantity"
                  min="0"
                />
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleUpdateStock}>
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
