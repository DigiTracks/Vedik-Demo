"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { fees, schoolSettings } from "@/lib/mock-data";
import { LOGO_PATH, BASE_PATH } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { Plus, Search, Download, DollarSign, AlertTriangle, CheckCircle, Printer } from "lucide-react";

export default function FeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<typeof fees[0] | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const filtered = fees.filter((f) => f.studentName.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalCollected = fees.filter((f) => f.status === "Paid").reduce((sum, f) => sum + f.paidAmount, 0);
  const totalPending = fees.filter((f) => f.status === "Pending" || f.status === "Overdue").reduce((sum, f) => sum + (f.amount - f.paidAmount), 0);
  const totalOverdue = fees.filter((f) => f.status === "Overdue").length;

  const handlePrintReceipt = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Receipt - ${selectedFee?.studentName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1a1a1a; }
          .receipt { max-width: 600px; margin: 0 auto; border: 2px solid #1a1a1a; }
          .header { text-align: center; padding: 24px; border-bottom: 2px solid #1a1a1a; }
          .header img { height: 60px; margin-bottom: 8px; }
          .header h1 { font-size: 20px; font-weight: 700; letter-spacing: 1px; }
          .header p { font-size: 12px; color: #555; margin-top: 4px; }
          .receipt-title { text-align: center; padding: 12px; background: #f0f0f0; font-weight: 700; font-size: 16px; letter-spacing: 2px; border-bottom: 2px solid #1a1a1a; }
          .details { padding: 24px; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #ccc; }
          .row:last-child { border-bottom: none; }
          .label { color: #555; font-size: 13px; }
          .value { font-weight: 600; font-size: 13px; }
          .total-row { margin-top: 16px; padding-top: 16px; border-top: 2px solid #1a1a1a; display: flex; justify-content: space-between; }
          .total-label { font-size: 16px; font-weight: 700; }
          .total-value { font-size: 16px; font-weight: 700; color: #16a34a; }
          .footer { padding: 16px 24px; border-top: 2px solid #1a1a1a; display: flex; justify-content: space-between; font-size: 12px; color: #555; }
          .stamp { text-align: center; padding: 24px; border-top: 2px dashed #ccc; }
          .stamp-line { width: 200px; border-top: 1px solid #1a1a1a; margin: 0 auto; padding-top: 8px; font-size: 12px; color: #555; }
          @media print { body { padding: 20px; } .no-print { display: none !important; } }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <img src="${window.location.origin}${BASE_PATH}/logo.png" alt="School Logo" onerror="this.style.display='none'" />
            <h1>${schoolSettings.name.toUpperCase()}</h1>
            <p>${schoolSettings.address}</p>
            <p>${schoolSettings.phone} | ${schoolSettings.email}</p>
          </div>
          <div class="receipt-title">FEE RECEIPT</div>
          <div class="details">
            <div class="row"><span class="label">Receipt No.</span><span class="value">VSK/${selectedFee?.id?.slice(-3)}/${new Date().getFullYear()}</span></div>
            <div class="row"><span class="label">Date</span><span class="value">${selectedFee?.paidDate || new Date().toLocaleDateString("en-IN")}</span></div>
            <div class="row"><span class="label">Student Name</span><span class="value">${selectedFee?.studentName}</span></div>
            <div class="row"><span class="label">Class</span><span class="value">${selectedFee?.class}</span></div>
            <div class="row"><span class="label">Fee Type</span><span class="value">${selectedFee?.feeType}</span></div>
            <div class="row"><span class="label">Academic Year</span><span class="value">${schoolSettings.academicYear}</span></div>
            <div class="row"><span class="label">Total Amount</span><span class="value">${formatCurrency(selectedFee?.amount || 0)}</span></div>
            <div class="row"><span class="label">Amount Paid</span><span class="value" style="color: #16a34a; font-weight: 700;">${formatCurrency(selectedFee?.paidAmount || 0)}</span></div>
            <div class="total-row">
              <span class="total-label">Balance</span>
              <span class="total-value">${formatCurrency((selectedFee?.amount || 0) - (selectedFee?.paidAmount || 0))}</span>
            </div>
          </div>
          <div class="stamp">
            <div class="stamp-line">Authorized Signature & Seal</div>
          </div>
          <div class="footer">
            <span>This is a computer-generated receipt.</span>
            <span>VEDIK School ERP v2.0</span>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fees</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage student fee collection</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
          <Button onClick={() => setShowCollectModal(true)}><Plus className="h-4 w-4" /> Collect Fee</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3"><DollarSign className="h-6 w-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Total Collected</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totalCollected)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3"><AlertTriangle className="h-6 w-6 text-yellow-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-xl font-bold text-red-600">{totalOverdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3"><CheckCircle className="h-6 w-6 text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Collection Rate</p>
                <p className="text-xl font-bold text-blue-600">{((totalCollected / (totalCollected + totalPending)) * 100).toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search by student name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.studentName}</TableCell>
                  <TableCell>{fee.class}</TableCell>
                  <TableCell>{fee.feeType}</TableCell>
                  <TableCell>{formatCurrency(fee.amount)}</TableCell>
                  <TableCell>{formatCurrency(fee.paidAmount)}</TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={fee.status === "Paid" ? "success" : fee.status === "Pending" ? "warning" : fee.status === "Partial" ? "info" : "danger"}>
                      {fee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {fee.status === "Paid" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setSelectedFee(fee); setShowReceiptModal(true); }}
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => setShowCollectModal(true)}>
                        Collect
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Collect Fee Modal */}
      <Modal open={showCollectModal} onClose={() => setShowCollectModal(false)} title="Collect Fee">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Student</label>
            <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
              <option>Select Student</option>
              {fees.filter((f) => f.status !== "Paid").map((f) => (
                <option key={f.id}>{f.studentName} - {f.feeType}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Amount</label>
            <input type="number" className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Enter amount" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Payment Method</label>
            <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
              <option>Cash</option>
              <option>Online</option>
              <option>Cheque</option>
              <option>Bank Transfer</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCollectModal(false)}>Cancel</Button>
            <Button onClick={() => setShowCollectModal(false)}>Collect Payment</Button>
          </div>
        </form>
      </Modal>

      {/* Receipt Preview Modal */}
      <Modal open={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Fee Receipt">
        <div className="flex justify-end mb-4">
          <Button onClick={handlePrintReceipt} size="sm">
            <Printer className="h-4 w-4 mr-1" /> Print Receipt
          </Button>
        </div>
        <div ref={receiptRef} className="rounded-xl border-2 border-gray-900 bg-white text-gray-900">
          <div className="border-b-2 border-gray-900 p-6 text-center">
            <img src={LOGO_PATH} alt="VEDIK Logo" className="mx-auto mb-2 h-14 w-14 object-contain" />
            <h2 className="text-xl font-bold tracking-wide">{schoolSettings.name.toUpperCase()}</h2>
            <p className="text-xs text-gray-500 mt-1">{schoolSettings.address}</p>
            <p className="text-xs text-gray-500">{schoolSettings.phone} | {schoolSettings.email}</p>
          </div>
          <div className="border-b-2 border-gray-900 bg-gray-100 py-2 text-center text-sm font-bold tracking-widest">
            FEE RECEIPT
          </div>
          <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Receipt No.</span>
              <span className="font-semibold">VSK/{selectedFee?.id?.slice(-3)}/{new Date().getFullYear()}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold">{selectedFee?.paidDate || new Date().toLocaleDateString("en-IN")}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Student Name</span>
              <span className="font-semibold">{selectedFee?.studentName}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Class</span>
              <span className="font-semibold">{selectedFee?.class}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Fee Type</span>
              <span className="font-semibold">{selectedFee?.feeType}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Academic Year</span>
              <span className="font-semibold">{schoolSettings.academicYear}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-semibold">{formatCurrency(selectedFee?.amount || 0)}</span>
            </div>
            <div className="flex justify-between border-b-2 border-gray-900 pb-2">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-green-600 text-base">{formatCurrency(selectedFee?.paidAmount || 0)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-base font-bold">Balance</span>
              <span className="text-base font-bold text-green-600">
                {formatCurrency((selectedFee?.amount || 0) - (selectedFee?.paidAmount || 0))}
              </span>
            </div>
          </div>
          <div className="border-t-2 border-gray-900 p-6 text-center">
            <div className="mx-auto w-48 border-t border-gray-400 pt-2 text-xs text-gray-500">
              Authorized Signature & Seal
            </div>
          </div>
          <div className="border-t border-gray-300 px-6 py-2 text-[10px] text-gray-400 flex justify-between">
            <span>This is a computer-generated receipt.</span>
            <span>VEDIK School ERP v2.0</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
