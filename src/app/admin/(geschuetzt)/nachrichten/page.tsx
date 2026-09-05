import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { deleteMessage, toggleMessageRead } from "@/actions/admin/inbox";
import { ActionForm, ConfirmDeleteButton } from "@/components/admin/action-form";
import { AdminHeading, Card, EmptyHint, Row } from "@/components/admin/ui";
import { Checkbox } from "@/components/ui/field";
import { adminMessages } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Nachrichten" };

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function MessagesPage() {
  const messages = await adminMessages();
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <AdminHeading
        title="Nachrichten"
        description="Alles, was über das Kontaktformular hereinkommt. Antworten Sie am besten direkt per E-Mail oder Telefon."
      />

      <Card title={`${messages.length} Nachrichten · ${unread} ungelesen`}>
        {messages.length === 0 ? (
          <EmptyHint>Es liegen keine Nachrichten vor.</EmptyHint>
        ) : (
          <div className="grid gap-4">
            {messages.map((message) => (
              <Row key={message.id} className={message.is_read ? "opacity-75" : undefined}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-forest-900">{message.name}</p>
                  <p className="text-xs text-muted">{dateFormat.format(new Date(message.created_at))} Uhr</p>
                </div>

                <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a href={`mailto:${message.email}`} className="inline-flex items-center gap-1.5 text-forest-800 hover:underline">
                    <Mail className="h-3.5 w-3.5" /> {message.email}
                  </a>
                  {message.phone ? (
                    <a href={`tel:${message.phone}`} className="inline-flex items-center gap-1.5 text-forest-800 hover:underline">
                      <Phone className="h-3.5 w-3.5" /> {message.phone}
                    </a>
                  ) : null}
                </div>

                <p className="whitespace-pre-wrap rounded-lg bg-cream-100 px-4 py-3 text-sm leading-relaxed text-ink-700">
                  {message.message}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                  <ActionForm action={toggleMessageRead} hidden={{ id: message.id }} submitLabel="Übernehmen" className="gap-2">
                    <Checkbox id={`read-${message.id}`} name="is_read" defaultChecked={message.is_read}>
                      Als erledigt markieren
                    </Checkbox>
                  </ActionForm>
                  <ConfirmDeleteButton action={deleteMessage} hidden={{ id: message.id }} />
                </div>
              </Row>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
