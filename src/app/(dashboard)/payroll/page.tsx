"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { payroll, schoolSettings } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { LOGO_PATH, BASE_PATH } from "@/lib/utils";
import { Download, DollarSign, Printer, Eye } from "lucide-react";

export default function PayrollPage() {
  const [selectedPay, setSelectedPay] = useState<typeof payroll[0] | null>(null);
  const [showPayslip, setShowPayslip] = useState(false);
  const totalPaid = payroll.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.netSalary, 0);
  const totalPending = payroll.filter((p) => p.status !== "Paid").reduce((sum, p) => sum + p.netSalary, 0);

  const handlePrintPayslip = () => {
    const p = selectedPay;
    if (!p) return;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payslip - ${p.staffName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1a1a1a; }
          .payslip { max-width: 600px; margin: 0 auto; border: 2px solid #1a1a1a; }
          .header { text-align: center; padding: 24px; border-bottom: 2px solid #1a1a1a; }
          .header img { height: 60px; margin-bottom: 8px; }
          .header h1 { font-size: 20px; font-weight: 700; letter-spacing: 1px; }
          .header p { font-size: 12px; color: #555; margin-top: 4px; }
          .title { text-align: center; padding: 12px; background: #f0f0f0; font-weight: 700; font-size: 16px; letter-spacing: 2px; border-bottom: 2px solid #1a1a1a; }
          .details { padding: 24px; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #ccc; }
          .row:last-child { border-bottom: none; }
          .label { color: #555; font-size: 13px; }
          .value { font-weight: 600; font-size: 13px; }
          .section-title { font-weight: 700; font-size: 13px; margin-top: 16px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #1a1a1a; }
          .total-row { margin-top: 16px; padding: 12px 0; border-top: 2px solid #1a1a1a; display: flex; justify-content: space-between; }
          .total-label { font-size: 16px; font-weight: 700; }
          .total-value { font-size: 16px; font-weight: 700; color: #16a34a; }
          .stamp { text-align: center; padding: 24px; border-top: 2px dashed #ccc; }
          .stamp-line { width: 200px; border-top: 1px solid #1a1a1a; margin: 0 auto; padding-top: 8px; font-size: 12px; color: #555; }
          .footer { padding: 16px 24px; border-top: 2px solid #1a1a1a; display: flex; justify-content: space-between; font-size: 12px; color: #555; }
        </style>
      </head>
      <body>
        <div class="payslip">
          <div class="header">
            <img src="${window.location.origin}${BASE_PATH}/logo.png" alt="School Logo" onerror="this.style.display='none'" />
            <h1>${schoolSettings.name.toUpperCase()}</h1>
            <p>${schoolSettings.address}</p>
            <p>${schoolSettings.phone} | ${schoolSettings.email}</p>
          </div>
          <div class="title">SALARY SLIP</div>
          <div class="details">
            <div class="row"><span class="label">Employee Name</span><span class="value">${p.staffName}</span></div>
            <div class="row"><span class="label">Position</span><span class="value">${p.position}</span></div>
            <div class="row"><span class="label">Pay Period</span><span class="value">${p.month} ${p.year}</span></div>
            <div class="row"><span class="label">Employee ID</span><span class="value">${p.staffId}</span></div>

            <div class="section-title">EARNINGS</div>
            <div class="row"><span class="label">Basic Salary</span><span class="value">${formatCurrency(p.basicSalary)}</span></div>
            <div class="row"><span class="label">Allowances</span><span class="value" style="color: #16a34a;">+${formatCurrency(p.allowances)}</span></div>

            <div class="section-title">DEDUCTIONS</div>
            <div class="row"><span class="label">Total Deductions</span><span class="value" style="color: #dc2626;">-${formatCurrency(p.deductions)}</span></div>

            <div class="total-row">
              <span class="total-label">NET SALARY</span>
              <span class="total-value">${formatCurrency(p.netSalary)}</span>
            </div>
          </div>
          <div class="stamp">
            <div class="stamp-line">Authorized Signature & Seal</div>
          </div>
          <div class="footer">
            <span>This is a computer-generated payslip.</span>
            <span>VEDIK School ERP v2.0</span>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll</h1>
          <p className="text-gray-500 dark:text-gray-400">Staff salary management</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Staff</p>
            <p className="text-2xl font-bold">{payroll.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Basic</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payroll.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.staffName}</TableCell>
                  <TableCell>{p.position}</TableCell>
                  <TableCell>{formatCurrency(p.basicSalary)}</TableCell>
                  <TableCell className="text-green-600">+{formatCurrency(p.allowances)}</TableCell>
                  <TableCell className="text-red-600">-{formatCurrency(p.deductions)}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(p.netSalary)}</TableCell>
                  <TableCell>{p.month} {p.year}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "Paid" ? "success" : p.status === "Processing" ? "warning" : "danger"}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSelectedPay(p); setShowPayslip(true); }}
                    >
                      <Printer className="h-4 w-4 mr-1" />
                      Payslip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payslip Preview Modal */}
      <Modal open={showPayslip} onClose={() => setShowPayslip(false)} title="Salary Slip Preview">
        <div className="flex justify-end mb-4">
          <Button onClick={handlePrintPayslip} size="sm">
            <Printer className="h-4 w-4 mr-1" /> Print Payslip
          </Button>
        </div>
        {selectedPay && (
          <div className="rounded-xl border-2 border-gray-900 bg-white text-gray-900">
            <div className="border-b-2 border-gray-900 p-6 text-center">
              <img src={LOGO_PATH} alt="VEDIK Logo" className="mx-auto mb-2 h-14 w-14 object-contain" />
              <h2 className="text-xl font-bold tracking-wide">{schoolSettings.name.toUpperCase()}</h2>
              <p className="text-xs text-gray-500 mt-1">{schoolSettings.address}</p>
              <p className="text-xs text-gray-500">{schoolSettings.phone} | {schoolSettings.email}</p>
            </div>
            <div className="border-b-2 border-gray-900 bg-gray-100 py-2 text-center text-sm font-bold tracking-widest">
              SALARY SLIP
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <span className="text-gray-500">Employee Name</span>
                <span className="font-semibold">{selectedPay.staffName}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <span className="text-gray-500">Position</span>
                <span className="font-semibold">{selectedPay.position}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <span className="text-gray-500">Pay Period</span>
                <span className="font-semibold">{selectedPay.month} {selectedPay.year}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <span className="text-gray-500">Employee ID</span>
                <span className="font-semibold">{selectedPay.staffId}</span>
              </div>

              <div className="font-bold text-xs tracking-wider text-gray-500 mt-4 mb-1 border-b border-gray-900 pb-1">EARNINGS</div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <span className="text-gray-500">Basic Salary</span>
                <span className="font-semibold">{formatCurrency(selectedPay.basicSalary)}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                <span className="text-gray-500">Allowances</span>
                <span className="font-semibold text-green-600">+{formatCurrency(selectedPay.allowances)}</span>
              </div>

              <div className="font-bold text-xs tracking-wider text-gray-500 mt-4 mb-1 border-b border-gray-900 pb-1">DEDUCTIONS</div>
              <div className="flex justify-between border-b-2 border-gray-900 pb-2">
                <span className="text-gray-500">Total Deductions</span>
                <span className="font-semibold text-red-600">-{formatCurrency(selectedPay.deductions)}</span>
              </div>

              <div className="flex justify-between pt-3">
                <span className="text-base font-bold">NET SALARY</span>
                <span className="text-base font-bold text-green-600">{formatCurrency(selectedPay.netSalary)}</span>
              </div>
            </div>
            <div className="border-t-2 border-gray-900 p-6 text-center">
              <div className="mx-auto w-48 border-t border-gray-400 pt-2 text-xs text-gray-500">
                Authorized Signature & Seal
              </div>
            </div>
            <div className="border-t border-gray-300 px-6 py-2 text-[10px] text-gray-400 flex justify-between">
              <span>This is a computer-generated payslip.</span>
              <span>VEDIK School ERP v2.0</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
