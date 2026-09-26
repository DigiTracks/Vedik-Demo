"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { certificates } from "@/lib/mock-data";
import { Award, Download, Eye, FileText, Printer } from "lucide-react";
import { schoolSettings } from "@/lib/mock-data";
import { LOGO_PATH, BASE_PATH } from "@/lib/utils";

const certTypes = [
  { type: "Transfer", description: "Transfer Certificate for student migration", color: "bg-blue-500" },
  { type: "Bonafide", description: "Bonafide certificate for identity verification", color: "bg-green-500" },
  { type: "Study", description: "Study certificate for academic proof", color: "bg-purple-500" },
  { type: "Character", description: "Character certificate for conduct", color: "bg-yellow-500" },
  { type: "Fee", description: "Fee paid certificate", color: "bg-indigo-500" },
];

export default function CertificatesPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const handlePrintCertificate = () => {
    const cert = selectedCert;
    if (!cert) return;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${cert.type} Certificate - ${cert.studentName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Georgia', 'Times New Roman', serif; padding: 40px; color: #1a1a1a; }
          .certificate { max-width: 700px; margin: 0 auto; border: 3px double #1a1a1a; padding: 40px; text-align: center; }
          .logo { height: 60px; margin-bottom: 8px; }
          .school-name { font-size: 24px; font-weight: 700; letter-spacing: 2px; color: #1a1a1a; }
          .address { font-size: 11px; color: #666; margin-top: 4px; font-family: 'Segoe UI', Arial, sans-serif; }
          .divider { width: 120px; height: 2px; background: #1a1a1a; margin: 20px auto; }
          .cert-title { font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 24px; color: #1a1a1a; }
          .cert-body { font-size: 15px; line-height: 1.8; color: #333; }
          .student-name { font-size: 22px; font-weight: 700; text-decoration: underline; margin: 16px 0; }
          .cert-footer { display: flex; justify-content: space-between; margin-top: 60px; font-size: 12px; color: #555; font-family: 'Segoe UI', Arial, sans-serif; }
          .sign-line { width: 180px; border-top: 1px solid #1a1a1a; padding-top: 6px; text-align: center; font-family: 'Segoe UI', Arial, sans-serif; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="certificate">
          <img src="${window.location.origin}${BASE_PATH}/logo.png" alt="Logo" class="logo" onerror="this.style.display='none'" />
          <div class="school-name">${schoolSettings.name.toUpperCase()}</div>
          <div class="address">${schoolSettings.address}<br/>${schoolSettings.phone} | ${schoolSettings.email}</div>
          <div class="divider"></div>
          <div class="cert-title">${cert.type} Certificate</div>
          <div class="cert-body">
            <p>This is to certify that</p>
            <p class="student-name">${cert.studentName}</p>
            <p>${
              cert.type === "Transfer"
                ? "has been a bonafide student of this institution and is hereby granted this Transfer Certificate for further academic pursuits."
                : cert.type === "Bonafide"
                ? "is a bonafide student of VEDIK School and is currently studying in this institution."
                : cert.type === "Study"
                ? "has successfully studied at VEDIK School and has completed the required academic curriculum."
                : cert.type === "Character"
                ? "has displayed excellent conduct and good character during the period of study at this institution."
                : "has cleared all dues towards tuition and other fees for the academic year."}
            </p>
          </div>
          <div class="cert-footer">
            <div>
              <div class="sign-line">Date: ${cert.issueDate}</div>
            </div>
            <div>
              <div class="sign-line">Principal Signature & Seal</div>
            </div>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h1>
          <p className="text-gray-500 dark:text-gray-400">Generate and manage certificates</p>
        </div>
      </div>

      {/* Certificate Types */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {certTypes.map((cert) => (
          <Card key={cert.type} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${cert.color} text-white`}>
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{cert.type}</h3>
              <p className="mt-1 text-xs text-gray-500">{cert.description}</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">Generate</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Certificates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{cert.type} Certificate</h4>
                    <p className="text-sm text-gray-500">{cert.studentName} | Issued: {cert.issueDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => { setSelectedCert(cert); setShowPreview(true); }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview Modal */}
      <Modal open={showPreview} onClose={() => setShowPreview(false)} title="Certificate Preview">
        {selectedCert && (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={handlePrintCertificate} size="sm">
                <Printer className="h-4 w-4 mr-1" /> Print Certificate
              </Button>
            </div>
            <div className="rounded-xl border-2 border-double border-gray-800 bg-gradient-to-br from-white to-gray-50 p-8 text-center">
            <Image src={LOGO_PATH} alt="VEDIK Logo" width={64} height={64} className="mx-auto mb-2 h-16 w-16 object-contain" />
            <div className="mb-4 text-2xl font-bold text-blue-600">VEDIK School</div>
            <div className="mx-auto mb-6 h-0.5 w-32 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-gray-800">
              {selectedCert.type} Certificate
            </h2>
            <p className="mb-2 text-gray-600">This is to certify that</p>
            <p className="mb-2 text-2xl font-bold text-gray-900">{selectedCert.studentName}</p>
            <p className="mb-6 text-gray-600">
              {selectedCert.type === "Transfer"
                ? "has been a student of this institution and is hereby granted Transfer Certificate."
                : selectedCert.type === "Bonafide"
                ? "is a bonafide student of this institution."
                : selectedCert.type === "Study"
                ? "has studied at this institution."
                : selectedCert.type === "Character"
                ? "has displayed good character during their stay at this institution."
                : "has paid all dues to the institution."}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Date: {selectedCert.issueDate}</span>
              <span>Issued by: {selectedCert.issuedBy}</span>
            </div>
            <div className="mt-8 border-t pt-4">
              <p className="text-sm text-gray-500">Principal Signature</p>
            </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
