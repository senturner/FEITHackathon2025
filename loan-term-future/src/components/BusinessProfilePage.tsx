// BusinessProfilePage.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import {
  Camera, Upload, FileText, Link2, Shield, Lock, Printer, Plus, Trash2
} from "lucide-react";

interface BusinessProfilePageProps {
  onNavigate: (page: string) => void;
}

/** OBJECTIVE-ONLY TYPES */
type CashRow = { id: string; date: string; inflow: string; outflow: string };
type Asset = { id: string; type: string; estValue: string };
type Liability = { id: string; provider: string; balance: string; repaymentFreq: "weekly" | "fortnightly" | "monthly" };
type RefItem = { id: string; name: string; contact?: string };

/** New: bill, rent, invoices, compliance rows (objective facts only) */
type BillRow = { id: string; provider: string; account?: string; avgMonthly?: string; lastPaidDate?: string };
type RentRow = { id: string; landlord: string; address?: string; monthlyRent?: string; lastPaidDate?: string };
type InvoiceRow = { id: string; supplier: string; issueDate: string; amount: string; paidDate?: string };
type ComplianceRow = { id: string; type: "Tax" | "Insurance"; ref?: string; status?: "current" | "lapsed"; validUntil?: string };

export function BusinessProfilePage({ onNavigate }: BusinessProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"setup" | "recurring">("setup");

  // --- Borrower & Business Basics (objective) ---
  const [kyc, setKyc] = useState({ fullName: "", address: "", dob: "", verified: false });
  const [biz, setBiz] = useState({
    businessName: "",
    tradingName: "",
    abn: "",
    structure: "",
    yearsTrading: "",
    staffCount: "",
    sector: "",
    location: "",
    remoteRural: false,
  });

  // --- Historic Evidence (objective) ---
  const [cash, setCash] = useState<CashRow[]>([
    { id: crypto.randomUUID(), date: "", inflow: "", outflow: "" },
  ]);
  const [bankConnected, setBankConnected] = useState(false);
  const [posConnected, setPosConnected] = useState(false);
  const [receiptCount, setReceiptCount] = useState(0);
  const [ratingsUploaded, setRatingsUploaded] = useState(false);

  // NEW: Bills / Rent / Supply-chain / Tax+Insurance
  const [bills, setBills] = useState<BillRow[]>([]);                       // utilities & telecom (recurring)
  const [rent, setRent] = useState<RentRow[]>([]);                         // rent (recurring)
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);              // supplier invoices (recurring)
  const [compliance, setCompliance] = useState<ComplianceRow[]>([]);       // tax/insurance (periodic)

  // Optional objective references/community
  const [supplierRefs, setSupplierRefs] = useState<RefItem[]>([]);
  const [communityNote, setCommunityNote] = useState("");

  // --- Consents ---
  const [consent, setConsent] = useState({ aiAnalysis: false, anonymizedUse: false });

  // --- Summary Modal ---
  const [openSummary, setOpenSummary] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // ===== Helpers (computed, NOT user-entered) =====
  const totals = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    cash.forEach(r => {
      inflow += parseFloat(r.inflow || "0");
      outflow += parseFloat(r.outflow || "0");
    });
    const net = inflow - outflow;
    return { inflow, outflow, net, weeks: cash.filter(r => r.date).length };
  }, [cash]);

  /** Coverage score: simple, additive, objective. */
  const dataCoverage = useMemo(() => {
    let pct = 0;
    if (bankConnected) pct += 30;
    if (posConnected) pct += 25;
    if (receiptCount > 0) pct += Math.min(10, receiptCount * 2);
    if (bills.length > 0) pct += 10;          // utilities/telecom
    if (rent.length > 0) pct += 10;           // rent
    if (invoices.length > 0) pct += 10;       // supply-chain
    if (compliance.length > 0) pct += 5;      // tax/insurance proof
    if (ratingsUploaded) pct += 5;            // bank statements/ratings
    return Math.min(100, pct);
  }, [bankConnected, posConnected, receiptCount, bills.length, rent.length, invoices.length, compliance.length, ratingsUploaded]);

  const coverageBadge: "outline" | "secondary" | "default" =
    dataCoverage >= 80 ? "default" : dataCoverage >= 50 ? "secondary" : "outline";

  // ===== Mutators =====
  const addCashRow = () => setCash(p => [...p, { id: crypto.randomUUID(), date: "", inflow: "", outflow: "" }]);
  const removeCashRow = (id: string) => setCash(p => p.filter(r => r.id !== id));

  const [assets, setAssets] = useState<Asset[]>([]);
  const addAsset = () => setAssets(p => [...p, { id: crypto.randomUUID(), type: "", estValue: "" }]);
  const removeAsset = (id: string) => setAssets(p => p.filter(a => a.id !== id));

  const [liabilities, setLiabilities] = useState<Liability[]>([]);
  const addLiability = () => setLiabilities(p => [...p, { id: crypto.randomUUID(), provider: "", balance: "", repaymentFreq: "monthly" }]);
  const removeLiability = (id: string) => setLiabilities(p => p.filter(l => l.id !== id));

  const addSupplierRef = () => setSupplierRefs(p => [...p, { id: crypto.randomUUID(), name: "", contact: "" }]);
  const removeSupplierRef = (id: string) => setSupplierRefs(p => p.filter(s => s.id !== id));

  // NEW: bills / rent / invoices / compliance mutators
  const addBill = () => setBills(p => [...p, { id: crypto.randomUUID(), provider: "", account: "", avgMonthly: "", lastPaidDate: "" }]);
  const removeBill = (id: string) => setBills(p => p.filter(b => b.id !== id));

  const addRent = () => setRent(p => [...p, { id: crypto.randomUUID(), landlord: "", address: "", monthlyRent: "", lastPaidDate: "" }]);
  const removeRent = (id: string) => setRent(p => p.filter(r => r.id !== id));

  const addInvoice = () => setInvoices(p => [...p, { id: crypto.randomUUID(), supplier: "", issueDate: "", amount: "", paidDate: "" }]);
  const removeInvoice = (id: string) => setInvoices(p => p.filter(i => i.id !== id));

  const addCompliance = () =>
    setCompliance(p => [...p, { id: crypto.randomUUID(), type: "Tax", ref: "", status: "current", validUntil: "" }]);
  const removeCompliance = (id: string) => setCompliance(p => p.filter(c => c.id !== id));

  // ===== Future-proof, non-functional AI summary stub =====
  const handleGenerateSummary = () => {
    if (!biz.businessName) {
      toast.error("Please enter your Business Name before generating the summary.");
      return;
    }
    // Future: POST to /api/summary -> n8n webhook, then render content.
    setOpenSummary(true);
  };

  // ===== UI =====
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Business Profile</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onNavigate("dashboard")}>Back to Dashboard</Button>
            <Button onClick={handleGenerateSummary}>
              <Printer className="h-4 w-4 mr-2" />
              Generate 1-page Summary
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="setup">Initial Business Set-up</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Data Collection</TabsTrigger>
          </TabsList>

          {/* ================== Initial Business Set-up ================== */}
          <TabsContent value="setup" className="space-y-6 pt-4">
            {/* Business & KYC */}
            <Card>
              <CardHeader><CardTitle>Borrower & Business Basics</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2"><Label>Full Name</Label>
                    <Input value={kyc.fullName} onChange={(e) => setKyc({ ...kyc, fullName: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Date of Birth</Label>
                    <Input type="date" value={kyc.dob} onChange={(e) => setKyc({ ...kyc, dob: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Address</Label>
                    <Input value={kyc.address} onChange={(e) => setKyc({ ...kyc, address: e.target.value })} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={kyc.verified} onCheckedChange={(v) => setKyc({ ...kyc, verified: v })} />
                  <Label>KYC Verified</Label>
                </div>
                <Separator />
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2"><Label>Business Name *</Label>
                    <Input value={biz.businessName} onChange={(e) => setBiz({ ...biz, businessName: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Trading Name (optional)</Label>
                    <Input value={biz.tradingName} onChange={(e) => setBiz({ ...biz, tradingName: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>ABN (optional)</Label>
                    <Input value={biz.abn} onChange={(e) => setBiz({ ...biz, abn: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Structure</Label>
                    <Input placeholder="Sole Trader / Company / etc." value={biz.structure} onChange={(e) => setBiz({ ...biz, structure: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Years Trading</Label>
                    <Input type="number" placeholder="e.g., 3" value={biz.yearsTrading} onChange={(e) => setBiz({ ...biz, yearsTrading: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Staff Count</Label>
                    <Input type="number" placeholder="e.g., 2" value={biz.staffCount} onChange={(e) => setBiz({ ...biz, staffCount: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Sector</Label>
                    <Input placeholder="e.g., Food Service / Retail" value={biz.sector} onChange={(e) => setBiz({ ...biz, sector: e.target.value })} />
                  </div>
                  <div className="space-y-2"><Label>Location</Label>
                    <Input placeholder="City / Region" value={biz.location} onChange={(e) => setBiz({ ...biz, location: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={biz.remoteRural} onCheckedChange={(v) => setBiz({ ...biz, remoteRural: v })} />
                    <Label>Remote/Rural</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historic Financial Evidence */}
            <Card>
              <CardHeader><CardTitle>Historic Financial Evidence</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Provide <strong>historic</strong> inflow/outflow evidence. More history = better AI score.
                </p>

                {/* Cash log */}
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <span>Date</span><span>Inflow ($)</span><span>Outflow ($)</span><span></span>
                  </div>
                  {cash.map(row => (
                    <div key={row.id} className="grid grid-cols-4 gap-2">
                      <Input type="date" value={row.date} onChange={(e) => setCash(p => p.map(r => r.id === row.id ? { ...r, date: e.target.value } : r))} />
                      <Input type="number" placeholder="0" value={row.inflow} onChange={(e) => setCash(p => p.map(r => r.id === row.id ? { ...r, inflow: e.target.value } : r))} />
                      <Input type="number" placeholder="0" value={row.outflow} onChange={(e) => setCash(p => p.map(r => r.id === row.id ? { ...r, outflow: e.target.value } : r))} />
                      <Button variant="ghost" size="icon" onClick={() => removeCashRow(row.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addCashRow}><Plus className="h-4 w-4 mr-2" />Add row</Button>
                </div>

                {/* Bank/POS/Statements */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Link2 className="h-4 w-4" /><span className="font-medium">Connect Bank</span></div><Switch checked={bankConnected} onCheckedChange={setBankConnected} /></div>
                    <p className="text-xs text-muted-foreground mt-2">Read-only connection for statements</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Link2 className="h-4 w-4" /><span className="font-medium">Connect POS</span></div><Switch checked={posConnected} onCheckedChange={setPosConnected} /></div>
                    <p className="text-xs text-muted-foreground mt-2">Import daily sales totals</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><FileText className="h-4 w-4" /><span className="font-medium">Upload Bank Records / Ratings</span></div><Checkbox checked={ratingsUploaded} onCheckedChange={(v) => setRatingsUploaded(!!v)} /></div>
                    <p className="text-xs text-muted-foreground mt-2">PDF/CSV statements, bureau files</p>
                  </div>
                </div>

                {/* NEW: Utilities & Telecom (recurring) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Utilities & Telecom (bill history)</h4>
                    <Button variant="outline" size="sm" onClick={addBill}><Plus className="h-4 w-4 mr-2" />Add bill</Button>
                  </div>
                  {bills.length === 0 && <p className="text-sm text-muted-foreground">Upload prior bills or enter summary rows.</p>}
                  <div className="space-y-2">
                    {bills.map(b => (
                      <div key={b.id} className="grid md:grid-cols-5 gap-2">
                        <Input placeholder="Provider (e.g., AGL, Telstra)" value={b.provider} onChange={(e) => setBills(p => p.map(x => x.id === b.id ? { ...x, provider: e.target.value } : x))} />
                        <Input placeholder="Account #" value={b.account} onChange={(e) => setBills(p => p.map(x => x.id === b.id ? { ...x, account: e.target.value } : x))} />
                        <Input type="number" placeholder="Avg monthly $" value={b.avgMonthly} onChange={(e) => setBills(p => p.map(x => x.id === b.id ? { ...x, avgMonthly: e.target.value } : x))} />
                        <Input type="date" placeholder="Last paid" value={b.lastPaidDate} onChange={(e) => setBills(p => p.map(x => x.id === b.id ? { ...x, lastPaidDate: e.target.value } : x))} />
                        <Button variant="ghost" size="icon" onClick={() => removeBill(b.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Upload bill PDFs/CSVs</Button>
                  </div>
                </div>

                {/* NEW: Rent (recurring) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Rent Payments</h4>
                    <Button variant="outline" size="sm" onClick={addRent}><Plus className="h-4 w-4 mr-2" />Add rent</Button>
                  </div>
                  {rent.length === 0 && <p className="text-sm text-muted-foreground">Enter landlord details or upload statements/receipts.</p>}
                  <div className="space-y-2">
                    {rent.map(rw => (
                      <div key={rw.id} className="grid md:grid-cols-5 gap-2">
                        <Input placeholder="Landlord/Agent" value={rw.landlord} onChange={(e) => setRent(p => p.map(x => x.id === rw.id ? { ...x, landlord: e.target.value } : x))} />
                        <Input placeholder="Premises (address)" value={rw.address} onChange={(e) => setRent(p => p.map(x => x.id === rw.id ? { ...x, address: e.target.value } : x))} />
                        <Input type="number" placeholder="Monthly $" value={rw.monthlyRent} onChange={(e) => setRent(p => p.map(x => x.id === rw.id ? { ...x, monthlyRent: e.target.value } : x))} />
                        <Input type="date" placeholder="Last paid" value={rw.lastPaidDate} onChange={(e) => setRent(p => p.map(x => x.id === rw.id ? { ...x, lastPaidDate: e.target.value } : x))} />
                        <Button variant="ghost" size="icon" onClick={() => removeRent(rw.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Upload lease/receipts</Button>
                </div>

                {/* NEW: Supply-chain invoices (recurring) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Supplier Invoices</h4>
                    <Button variant="outline" size="sm" onClick={addInvoice}><Plus className="h-4 w-4 mr-2" />Add invoice</Button>
                  </div>
                  {invoices.length === 0 && <p className="text-sm text-muted-foreground">Upload CSV/PDF exports from procurement/AP or add rows.</p>}
                  <div className="space-y-2">
                    {invoices.map(i => (
                      <div key={i.id} className="grid md:grid-cols-5 gap-2">
                        <Input placeholder="Supplier" value={i.supplier} onChange={(e) => setInvoices(p => p.map(x => x.id === i.id ? { ...x, supplier: e.target.value } : x))} />
                        <Input type="date" placeholder="Issue date" value={i.issueDate} onChange={(e) => setInvoices(p => p.map(x => x.id === i.id ? { ...x, issueDate: e.target.value } : x))} />
                        <Input type="number" placeholder="Amount $" value={i.amount} onChange={(e) => setInvoices(p => p.map(x => x.id === i.id ? { ...x, amount: e.target.value } : x))} />
                        <Input type="date" placeholder="Paid date (optional)" value={i.paidDate} onChange={(e) => setInvoices(p => p.map(x => x.id === i.id ? { ...x, paidDate: e.target.value } : x))} />
                        <Button variant="ghost" size="icon" onClick={() => removeInvoice(i.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Upload invoice exports</Button>
                </div>

                {/* NEW: Tax & Insurance (periodic) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Tax & Insurance</h4>
                    <Button variant="outline" size="sm" onClick={addCompliance}><Plus className="h-4 w-4 mr-2" />Add record</Button>
                  </div>
                  {compliance.length === 0 && <p className="text-sm text-muted-foreground">Provide proof of active policies or recent filings.</p>}
                  <div className="space-y-2">
                    {compliance.map(c => (
                      <div key={c.id} className="grid md:grid-cols-5 gap-2">
                        <Input placeholder="Type: Tax or Insurance" value={c.type} onChange={(e) => setCompliance(p => p.map(x => x.id === c.id ? { ...x, type: (e.target.value as "Tax" | "Insurance") } : x))} />
                        <Input placeholder="Reference / Policy #" value={c.ref} onChange={(e) => setCompliance(p => p.map(x => x.id === c.id ? { ...x, ref: e.target.value } : x))} />
                        <Input placeholder="Status (current/lapsed)" value={c.status} onChange={(e) => setCompliance(p => p.map(x => x.id === c.id ? { ...x, status: (e.target.value as "current" | "lapsed") } : x))} />
                        <Input type="date" placeholder="Valid until" value={c.validUntil} onChange={(e) => setCompliance(p => p.map(x => x.id === c.id ? { ...x, validUntil: e.target.value } : x))} />
                        <Button variant="ghost" size="icon" onClick={() => removeCompliance(c.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Upload policy/ATO PDFs</Button>
                </div>

                {/* Coverage */}
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2"><span className="text-sm">Data Coverage</span><Badge variant={coverageBadge}>{dataCoverage}%</Badge></div>
                  <Progress value={dataCoverage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Bank/POS + bills/rent + invoices + tax/insurance improves your score the most.</p>
                </div>
              </CardContent>
            </Card>

            {/* Assets & Liabilities */}
            <Card>
              <CardHeader><CardTitle>Assets & Liabilities</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Assets you own</h4>
                  {assets.length === 0 && <p className="text-sm text-muted-foreground">Add equipment, vehicle, inventory, etc.</p>}
                  <div className="space-y-2">
                    {assets.map(a => (
                      <div key={a.id} className="grid md:grid-cols-3 gap-2">
                        <Input placeholder="Type (e.g., Espresso machine)" value={a.type} onChange={(e) => setAssets(p => p.map(x => x.id === a.id ? { ...x, type: e.target.value } : x))} />
                        <Input type="number" placeholder="Estimated value ($)" value={a.estValue} onChange={(e) => setAssets(p => p.map(x => x.id === a.id ? { ...x, estValue: e.target.value } : x))} />
                        <Button variant="ghost" size="icon" onClick={() => removeAsset(a.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" onClick={addAsset}><Plus className="h-4 w-4 mr-2" />Add asset</Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Existing loans or liabilities</h4>
                  {liabilities.length === 0 && <p className="text-sm text-muted-foreground">Add balances that require repayments.</p>}
                  <div className="space-y-2">
                    {liabilities.map(l => (
                      <div key={l.id} className="grid md:grid-cols-4 gap-2">
                        <Input placeholder="Provider" value={l.provider} onChange={(e) => setLiabilities(p => p.map(x => x.id === l.id ? { ...x, provider: e.target.value } : x))} />
                        <Input type="number" placeholder="Balance ($)" value={l.balance} onChange={(e) => setLiabilities(p => p.map(x => x.id === l.id ? { ...x, balance: e.target.value } : x))} />
                        <Input placeholder="Repayment frequency" value={l.repaymentFreq} onChange={(e) => setLiabilities(p => p.map(x => x.id === l.id ? { ...x, repaymentFreq: (e.target.value as any) } : x))} />
                        <Button variant="ghost" size="icon" onClick={() => removeLiability(l.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" onClick={addLiability}><Plus className="h-4 w-4 mr-2" />Add liability</Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Supplier references (optional)</h4>
                  <div className="space-y-2">
                    {supplierRefs.map(s => (
                      <div key={s.id} className="grid md:grid-cols-3 gap-2">
                        <Input placeholder="Supplier name" value={s.name} onChange={(e) => setSupplierRefs(p => p.map(x => x.id === s.id ? { ...x, name: e.target.value } : x))} />
                        <Input placeholder="Contact (phone/email)" value={s.contact} onChange={(e) => setSupplierRefs(p => p.map(x => x.id === s.id ? { ...x, contact: e.target.value } : x))} />
                        <Button variant="ghost" size="icon" onClick={() => removeSupplierRef(s.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" onClick={addSupplierRef}><Plus className="h-4 w-4 mr-2" />Add supplier</Button>
                </div>

                <div className="space-y-2">
                  <Label>Community evidence (optional)</Label>
                  <Textarea placeholder="E.g., Local chamber membership, landlord letter. Keep factual." value={communityNote} onChange={(e) => setCommunityNote(e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Consent */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-green-600" /><span>Privacy & Consent</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox id="ai" checked={consent.aiAnalysis} onCheckedChange={(v) => setConsent({ ...consent, aiAnalysis: !!v })} />
                  <div>
                    <Label htmlFor="ai">I consent to AI analysis of my uploaded/connected data</Label>
                    <p className="text-xs text-muted-foreground">No subjective scoring needed — we analyze receipts, cashflow, and connections.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="anon" checked={consent.anonymizedUse} onCheckedChange={(v) => setConsent({ ...consent, anonymizedUse: !!v })} />
                  <div>
                    <Label htmlFor="anon">I agree to anonymized use to improve risk models</Label>
                    <p className="text-xs text-muted-foreground">Your identity is protected; data helps similar businesses.</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2"><Lock className="h-4 w-4 text-green-700" /><span className="text-sm font-medium text-green-800">Your data is protected</span></div>
                  <p className="text-xs text-green-700">We use bank-level encryption. Lenders only see what’s needed after you accept a match.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================== Recurring Data Collection ================== */}
          <TabsContent value="recurring" className="space-y-6 pt-4">
            <Card>
              <CardHeader><CardTitle>Daily/Weekly Capture</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-12" onClick={() => { setReceiptCount(c => c + 1); toast.success("Receipt captured"); }}>
                    <Camera className="h-5 w-5 mr-2" /> Scan Receipt
                  </Button>
                  <Button variant="outline" className="h-12"><Upload className="h-5 w-5 mr-2" /> Upload Batch (images/CSV)</Button>
                  <Button variant="outline" className="h-12"><FileText className="h-5 w-5 mr-2" /> Upload Bank/POS Export</Button>
                </div>

                {/* Ongoing feeds for bills/rent/invoices (self-select) */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Link2 className="h-4 w-4" /><span className="font-medium">Connect Utility/Telecom Portal</span></div>
                      {/* future: real connection toggle */}
                      <Switch />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Pull new bill payments automatically.</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Link2 className="h-4 w-4" /><span className="font-medium">Connect Rent Portal</span></div><Switch /></div>
                    <p className="text-xs text-muted-foreground mt-2">Sync ongoing rent receipts.</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Link2 className="h-4 w-4" /><span className="font-medium">Connect Accounting (Xero/QuickBooks)</span></div><Switch /></div>
                    <p className="text-xs text-muted-foreground mt-2">Automate invoices and expense feeds.</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Link2 className="h-4 w-4" /><span className="font-medium">Connect ATO/Insurer (read-only)</span></div><Switch /></div>
                    <p className="text-xs text-muted-foreground mt-2">Verify current insurance and filings.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-sm">Receipts scanned (last 7 days)</p>
                    <p className="text-2xl font-bold mt-1">{receiptCount}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-sm">Historic weeks logged</p>
                    <p className="text-2xl font-bold mt-1">{totals.weeks}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-1"><p className="text-sm">Data Coverage</p><Badge variant={coverageBadge}>{dataCoverage}%</Badge></div>
                    <Progress value={dataCoverage} className="h-2" />
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">Tip: 8–12 weeks of bank/POS + bills/rent + supplier invoices + current tax/insurance gives the model the best signal.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ================== Print-friendly Summary ================== */}
      <Dialog open={openSummary} onOpenChange={setOpenSummary}>
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle>One-page Business Summary</DialogTitle>
            <DialogDescription>Share this with potential lenders. Facts only — no subjective assessments.</DialogDescription>
          </DialogHeader>

          <div ref={printRef} className="space-y-4 print:p-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{biz.businessName || "Business Name"}</h3>
              <Badge variant={coverageBadge}>Data Coverage {dataCoverage}%</Badge>
            </div>
            <Separator />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Borrower & Business</h4>
                <p className="text-sm"><strong>Owner:</strong> {kyc.fullName || "—"}</p>
                <p className="text-sm"><strong>Address:</strong> {kyc.address || "—"}</p>
                <p className="text-sm"><strong>Trading Name:</strong> {biz.tradingName || "—"}</p>
                <p className="text-sm"><strong>ABN:</strong> {biz.abn || "—"}</p>
                <p className="text-sm"><strong>Structure:</strong> {biz.structure || "—"}</p>
                <p className="text-sm"><strong>Years Trading:</strong> {biz.yearsTrading || "—"}</p>
                <p className="text-sm"><strong>Staff:</strong> {biz.staffCount || "—"}</p>
                <p className="text-sm"><strong>Sector:</strong> {biz.sector || "—"}</p>
                <p className="text-sm"><strong>Location:</strong> {biz.location || "—"}</p>
                <p className="text-sm"><strong>Remote/Rural:</strong> {biz.remoteRural ? "Yes" : "No"}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Evidence Summary</h4>
                <p className="text-sm"><strong>Weeks of history:</strong> {totals.weeks}</p>
                <p className="text-sm"><strong>Total inflows:</strong> ${totals.inflow.toFixed(2)}</p>
                <p className="text-sm"><strong>Total outflows:</strong> ${totals.outflow.toFixed(2)}</p>
                <p className="text-sm"><strong>Net (in − out):</strong> ${totals.net.toFixed(2)}</p>
                <p className="text-sm"><strong>Bank connected:</strong> {bankConnected ? "Yes" : "No"}</p>
                <p className="text-sm"><strong>POS connected:</strong> {posConnected ? "Yes" : "No"}</p>
                <p className="text-sm"><strong>Bills/Rent/Invoices:</strong> {bills.length + rent.length + invoices.length}</p>
                <p className="text-sm"><strong>Tax/Insurance records:</strong> {compliance.length}</p>
                <p className="text-sm"><strong>Ratings/Statements uploaded:</strong> {ratingsUploaded ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Assets</h4>
                {assets.length === 0 ? <p className="text-sm text-muted-foreground">—</p> : (
                  <ul className="text-sm list-disc pl-5">{assets.map(a => <li key={a.id}>{a.type || "Asset"} — ${a.estValue || "0"}</li>)}</ul>
                )}
              </div>
              <div>
                <h4 className="font-medium mb-1">Liabilities</h4>
                {liabilities.length === 0 ? <p className="text-sm text-muted-foreground">—</p> : (
                  <ul className="text-sm list-disc pl-5">{liabilities.map(l => <li key={l.id}>{l.provider || "Provider"} — ${l.balance || "0"} ({l.repaymentFreq})</li>)}</ul>
                )}
              </div>
            </div>

            {supplierRefs.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Supplier References</h4>
                <ul className="text-sm list-disc pl-5">{supplierRefs.map(s => <li key={s.id}>{s.name || "Supplier"} {s.contact ? `— ${s.contact}` : ""}</li>)}</ul>
              </div>
            )}

            {communityNote?.trim() && (
              <div>
                <h4 className="font-medium mb-1">Community Evidence</h4>
                <p className="text-sm">{communityNote}</p>
              </div>
            )}

            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Summary is generated from objective data (receipts, cashflow logs, bank/POS connections, bills, rent, invoices, tax/insurance).
                AI risk assessment is performed separately based on this evidence.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 print:hidden">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" /> Print / Save as PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

