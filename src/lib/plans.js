export const PLANS = [
  {
    id: 'basic', name: 'Basic', monthly: 15, annual: 150, annualSave: '17%', badge: null,
    features: ['Full HD 1080p streaming', '1 simultaneous screen', '5,000+ channels', 'VOD library access', 'Email support'],
    cta: 'Order Basic', highlighted: false, screens: 1, quality: 'Full HD 1080p', channels: '5,000+', support: 'Email', epg: false, catchup: false,
  },
  {
    id: 'plus', name: 'Plus', monthly: 25, annual: 240, annualSave: '20%', badge: null,
    features: ['4K Ultra HD streaming', '2 simultaneous screens', '10,000+ channels', 'VOD library access', 'Priority support', 'EPG TV guide'],
    cta: 'Order Plus', highlighted: false, screens: 2, quality: '4K Ultra HD', channels: '10,000+', support: 'Priority', epg: true, catchup: false,
  },
  {
    id: 'premium', name: 'Premium', monthly: 40, annual: 380, annualSave: '21%', badge: 'Most Popular',
    features: ['4K Ultra HD & HDR', '3 simultaneous screens', '15,000+ channels', 'Full VOD library', '24/7 Priority support', 'EPG TV guide', 'Catch-up TV'],
    cta: 'Order Premium', highlighted: true, screens: 3, quality: '4K Ultra HD & HDR', channels: '15,000+', support: '24/7 Priority', epg: true, catchup: true,
  },
  {
    id: 'ultimate', name: 'Ultimate', monthly: 60, annual: 576, annualSave: '20%', badge: 'Best Value',
    features: ['4K Ultra HD & HDR', '5 simultaneous screens', '20,000+ channels', 'Full VOD library', '24/7 VIP support', 'EPG TV guide', 'Catch-up TV', 'Multi-device login'],
    cta: 'Order Ultimate', highlighted: false, screens: 5, quality: '4K Ultra HD & HDR', channels: '20,000+', support: '24/7 VIP', epg: true, catchup: true,
  },
]
