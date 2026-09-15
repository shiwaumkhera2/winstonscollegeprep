import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/Button'
import { FORM_ENDPOINT, WEB3FORMS_ACCESS_KEY, site } from '@/config'
import { courses, findCourse } from '@/data/courses'
import { EASE } from '@/lib/variants'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'mailto'

const fieldClass =
  'block w-full rounded-[3px] border border-slate-200 bg-ice-50/70 px-4 py-3.5 text-navy-900 outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-ink-400 focus:border-sky-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(79,142,247,0.15)]'
const labelClass = 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600'

interface Payload {
  name: string
  email: string
  course: string
  message: string
}

function buildMailto({ name, email, course, message }: Payload): string {
  const subject = `Enquiry from ${name}${course ? ` — ${course}` : ''}`
  const body = `Name: ${name}\nEmail: ${email}\nCourse of interest: ${course || 'Not specified'}\n\n${message}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactForm() {
  const [searchParams] = useSearchParams()
  const preselected = findCourse(searchParams.get('course'))
  const [course, setCourse] = useState(preselected?.slug ?? '')
  const [status, setStatus] = useState<Status>('idle')
  const [submittedName, setSubmittedName] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never see this field.
    if (data.get('_gotcha')) return

    const payload: Payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      course: findCourse(String(data.get('course') ?? ''))?.title ?? '',
      message: String(data.get('message') ?? '').trim(),
    }
    setSubmittedName(payload.name)

    if (!FORM_ENDPOINT) {
      // No form service configured: hand off to the visitor's email app.
      window.location.href = buildMailto(payload)
      setStatus('mailto')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          subject: `New enquiry from ${payload.name}${payload.course ? ` — ${payload.course}` : ''}`,
          from_name: site.name,
          ...(WEB3FORMS_ACCESS_KEY ? { access_key: WEB3FORMS_ACCESS_KEY } : {}),
        }),
      })
      if (!response.ok) throw new Error(`Form service responded with ${response.status}`)
      form.reset()
      setCourse('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-card border border-slate-200 bg-white p-6 sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-[3px] border border-royal-600/15 bg-ice-50 text-royal-600"
            >
              <CheckCircle2 className="size-8" strokeWidth={1.6} aria-hidden />
            </motion.span>
            <h3 className="mt-7 font-display text-3xl">Message sent</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-ink-600">
              Thank you{submittedName ? `, ${submittedName}` : ''}. We have received your message and will be in touch soon.
            </p>
            <Button variant="secondary" className="mt-8" onClick={() => setStatus('idle')}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate={false}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={fieldClass} />
              </div>
            </div>

            <div>
              <label htmlFor="course" className={labelClass}>
                Course of interest
              </label>
              <select
                id="course"
                name="course"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                className={`${fieldClass} select-chevron appearance-none pr-11`}
              >
                <option value="">Select a course</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your goals, target test date, or any questions you have."
                className={`${fieldClass} resize-y`}
              />
            </div>

            {/* Honeypot for bots — hidden from people and assistive tech. */}
            <div className="hidden" aria-hidden>
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <span className="flex items-start gap-3 rounded-[3px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <span>
                      We could not send your message. Please try again, or email us directly at{' '}
                      <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
                        {site.email}
                      </a>
                      .
                    </span>
                  </span>
                </motion.p>
              )}
              {status === 'mailto' && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <span className="flex items-start gap-3 rounded-[3px] border border-sky-400/40 bg-ice-50 px-4 py-3 text-sm text-navy-900">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-royal-600" aria-hidden />
                    <span>
                      Your email app should now be open with your message ready to send. If it did not open, email us at{' '}
                      <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
                        {site.email}
                      </a>
                      .
                    </span>
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">We reply to every message personally</p>
              <Button
                type="submit"
                size="lg"
                disabled={status === 'submitting'}
                icon={status === 'submitting' ? <Loader2 className="animate-spin" /> : <Send />}
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
