import React from "react";

export default function UHIDCardPrintable({ patient }) {
  // patient = { name, uhid, age, gender, native_state, native_district }
  return (
    <div id="printable" className="p-6 max-w-sm border rounded shadow-sm bg-white">
      <div className="text-sm font-medium">Kerala Migrant Health — UHID Card</div>
      <h2 className="text-xl font-semibold mt-2">{patient?.name || "Name"}</h2>
      <div className="mt-2">UHID: <strong>{patient?.uhid || "KER-2025-000001"}</strong></div>
      <div>Age: {patient?.age || "-" } | Gender: {patient?.gender || "-"}</div>
      <div>Native: {patient?.native_state || "-"} / {patient?.native_district || "-"}</div>

      <div className="mt-4 text-xs text-gray-600">Show this card and OTP when visiting a clinic.</div>

      <div className="mt-6">
        <button onClick={() => window.print()} className="px-4 py-2 rounded bg-primary text-white">Print Card</button>
      </div>
    </div>
  );
}
