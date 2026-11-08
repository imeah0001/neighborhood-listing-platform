"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import ServiceCard, { type ServiceListing } from "./ServiceCard";

export default function ServicesExplorer() {
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selected, setSelected] = useState<ServiceListing | null>(null);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadServices() {
      try {
        const response = await fetch("/api/services", {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load services");
        }

        if (!Array.isArray(data.services)) {
          throw new Error("Unexpected server response");
        }

        setServices(data.services);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load services"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadServices();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selected) emailRef.current?.focus();
  }, [selected]);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: selected.id,
          client_email: email,
          requested_date: date,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking request failed");
      }

      setMessage("Your booking request was submitted.");
      setSelected(null);
      setEmail("");
      setDate("");
      setNotes("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Booking request failed"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="services-heading" className="mt-12">
      <h2
        id="services-heading"
        className="text-3xl font-bold text-slate-900"
      >
        Local Merchant Services
      </h2>

      <p className="mt-3 text-slate-700">
        Explore approved neighborhood services and request appointments.
      </p>

      {loading && (
        <p role="status" className="mt-6">
          Loading services...
        </p>
      )}

      {loadError && (
        <p role="alert" className="mt-6 text-red-700">
          {loadError}
        </p>
      )}

      {!loading && !loadError && services.length === 0 && (
        <p className="mt-6 rounded-lg bg-white p-6 text-slate-700">
          No approved services are available yet.
        </p>
      )}

      {!loading && !loadError && services.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={(item) => {
                setMessage("");
                setSelected(item);
              }}
            />
          ))}
        </div>
      )}

      {selected && (
        <form
          onSubmit={submitBooking}
          className="mt-10 max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6"
        >
          <h3 className="text-xl font-bold">
            Book {selected.title}
          </h3>

          <div>
            <label htmlFor="booking-email" className="block font-medium">
              Email address
            </label>
            <input
              ref={emailRef}
              id="booking-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded border p-3 focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="booking-date" className="block font-medium">
              Requested date
            </label>
            <input
              id="booking-date"
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1 w-full rounded border p-3 focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="booking-notes" className="block font-medium">
              Appointment details
            </label>
            <textarea
              id="booking-notes"
              required
              minLength={10}
              maxLength={1000}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-1 w-full rounded border p-3 focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {submitting ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      )}

      {message && (
        <p role="status" className="mt-5 font-medium">
          {message}
        </p>
      )}
    </section>
  );
}
