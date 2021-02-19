import { loadStripe as stripeLoadStripe } from '@stripe/stripe-js'

export const loadStripe = stripeLoadStripe(
	process.env.REACT_APP_STRIPE_API_KEY || ''
)
