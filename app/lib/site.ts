export const PHONE = '0424 718 151'
export const TEL = 'tel:0424718151'
export const INSTAGRAM = 'https://www.instagram.com/jtluxurytints/'
export const SITE_URL = 'https://jtluxurytints.com.au'
export const FORMSPREE = 'https://formspree.io/f/mblqrday'
export const IMG = '/images/site'

/** POST a lead to Formspree as JSON. Throws with a readable message on failure. */
export async function sendLead(data: Record<string, string>): Promise<void> {
  let res: Response
  try {
    res = await fetch(FORMSPREE, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    throw new Error(`Couldn't reach the server. Check your connection, or call Julian on ${PHONE}.`)
  }
  if (!res.ok) {
    let msg = ''
    try {
      const j = (await res.json()) as { errors?: { message?: string }[] }
      msg = j.errors?.map((e) => e.message).filter(Boolean).join(', ') ?? ''
    } catch {
      /* non-JSON error body */
    }
    throw new Error(msg || `That didn't send. Try again, or call Julian on ${PHONE}.`)
  }
}

/** Loose AU phone check: 8-12 digits once spaces, dashes, brackets and a leading + are stripped. */
export const validPhone = (v: string) => /^\+?\d{8,12}$/.test(v.replace(/[\s\-()]/g, ''))
