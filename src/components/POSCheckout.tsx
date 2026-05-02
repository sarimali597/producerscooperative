import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, User, CreditCard, Printer, Plus, Trash2, ShieldCheck } from 'lucide-react';

export function POSCheckout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [memberFound, setMemberFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      setMemberFound(true);
    }
  };

  const orderItems = [
    { id: 1, desc: 'Custom Cattle Feed Blend (14% Protein)', qty: 2.5, unit: 'Ton', price: 280.00 },
    { id: 2, desc: '50lb Bag Premium Fertilizer (10-10-10)', qty: 10, unit: 'Bag', price: 18.50 },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const tax = subtotal * 0.0625; // 6.25% TX State Tax approx
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Member Point of Sale</h2>
        <p className="text-slate-500">Retail interface for cooperative members purchasing feed, seed, and supplies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Member Lookup & Cart */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Co-op Member Account Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    placeholder="Search by Phone Number, Name, or Member ID..." 
                    className="pl-10 h-12 text-lg shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="h-12 px-8 font-semibold">Lookup</Button>
              </form>

              {memberFound && (
                <div className="mt-6 p-4 border border-green-200 bg-green-50 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-700">
                    <User size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-green-900 text-lg">Brazos Valley Farms LLC</h3>
                        <p className="text-green-700 text-sm">Member ID: #TX-99281 • Active since 2018</p>
                      </div>
                      <span className="bg-green-200 text-green-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                        <ShieldCheck size={14} /> Account Good Standing
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-green-200/50">
                      <div>
                        <span className="text-green-700/70 text-xs font-semibold uppercase tracking-wider">Equity Balance</span>
                        <div className="font-mono font-bold text-green-900 text-lg">$4,500.00</div>
                      </div>
                      <div>
                        <span className="text-green-700/70 text-xs font-semibold uppercase tracking-wider">Available Credit Line</span>
                        <div className="font-mono font-bold text-green-900 text-lg">$15,000.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 flex flex-col min-h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Current Order</CardTitle>
              <Button variant="outline" size="sm" className="gap-1 h-8">
                <Plus size={14} /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="w-[45%]">Item Description</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Ext Price</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-700">{item.desc}</TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.qty} step="0.5" className="w-20 h-8" />
                      </TableCell>
                      <TableCell className="text-slate-500">{item.unit}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">${(item.qty * item.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50">
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Checkout Summary */}
        <div className="lg:col-span-4">
          <Card className="shadow-xl border-slate-200 sticky top-8 bg-white">
            <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Co-op Discount</span>
                  <span className="font-medium text-emerald-600">-$0.00</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>State Tax (6.25%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-end">
                  <span className="text-base font-semibold text-slate-800">Total Due</span>
                  <span className="text-3xl font-bold tracking-tight text-slate-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <Button 
                  className="w-full h-14 text-lg bg-green-700 hover:bg-green-800 text-white shadow-md hover:shadow-lg transition-all"
                  disabled={!memberFound}
                >
                  <CreditCard className="mr-2" size={20} />
                  Charge to Account
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 border-slate-300 font-medium">
                    Pay via ACH
                  </Button>
                  <Button variant="outline" className="h-12 border-slate-300 font-medium">
                    Credit Card
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t border-slate-100 p-4">
              <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-800 gap-2">
                <Printer size={16} />
                Print Invoice Estimate
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
