# Reservation Payment Component Implementation

This is a complete React + Tailwind CSS implementation of the DMCI Homes Reservation Payment design from Figma.

## Component Details

**File:** `ReservationPayment.tsx`

**Framework:** React 18+ with Tailwind CSS v4

**Features:**
- Responsive payment method selection (Visa, GCash, BPI, BDO, Union Bank)
- Property information display
- Payment summary with dynamic total calculation
- Interactive UI with hover states
- Fully typed TypeScript component

## Asset Management

The component uses Figma asset URLs that expire in 7 days. For production use, follow these steps:

### Option 1: Use Remote URLs (Development)
The component currently uses Figma asset URLs directly. These will work for testing but should be replaced with local assets before deploying to production.

### Option 2: Save Assets Locally (Recommended)
1. Create a public/assets folder in your project
2. Download each SVG from the Figma asset URLs
3. Update the asset paths in the component:

```typescript
const assets = {
  symbol: '/assets/symbol.svg',
  sales: '/assets/sales.svg',
  text: '/assets/text.svg',
  // ... etc
};
```

### Option 3: Use CDN or CMS
Store the SVG files on your CDN or CMS and update the asset paths accordingly.

## Integration Steps

1. **Copy the component to your project:**
   ```
   src/components/ReservationPayment.tsx
   ```

2. **Update imports if needed:**
   - The component uses lucide-react for icons (optional, can be removed)
   - Uses only standard React and Tailwind CSS

3. **Add to your routes:**
   ```typescript
   import ReservationPayment from './components/ReservationPayment';
   
   // In your router:
   <Route path="/reservation-payment" element={<ReservationPayment />} />
   ```

4. **Customize the component:**
   - Update `handlePaymentSubmit` with your payment logic
   - Modify property and customer data to fetch from your API
   - Update footer contact information and links

## Tailwind CSS Classes Used

The component uses standard Tailwind CSS utilities. Make sure your tailwind.config.ts includes:
- Color tokens (gray, blue, etc.)
- Spacing utilities
- Typography scale
- Border and shadow utilities

## Data Binding

Current hardcoded data that should be connected to your API:

### Property Information
- Holding ID: `HLD0327518`
- Customer Account No: `B000208311`
- Customer Name: `Jose B. Santos`
- Property: `CAL`
- Property Unit: `CAL-00A-C-12020`
- Description: `Reservation fee for Unit CAL-00A-C-12020`

### Payment Summary
- Reservation Fee: `PHP30,000.00`
- Convenience Fee: `PHP628.00`
- Total: `PHP30,628.00`

### Payment Methods
Currently mock data. Connect to your payment provider integration.

## Component API

### Props
None currently - can be easily extended to accept:

```typescript
interface ReservationPaymentProps {
  holdingId: string;
  customerName: string;
  propertyUnit: string;
  reservationFee: number;
  convenienceFee: number;
  onPaymentSubmit: (method: string) => Promise<void>;
}
```

### State
- `selectedPayment`: Currently selected payment method

## Styling Details

- **Primary Color:** Blue (#07389d / #06318a)
- **Background:** Gray-50 (#f9fafb)
- **Border Color:** Gray-200 (#e5e7eb)
- **Text:** Gray-900 (#111827) for primary text
- **Spacing:** Uses Tailwind's default 4px base unit

## Browser Support

Works on all modern browsers that support:
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- CSS Variables (for design tokens)

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Form controls with labels
- Color contrast ratios meet WCAG standards
- Focus states for keyboard navigation

## Next Steps

1. Replace Figma asset URLs with local assets
2. Connect to your API for property and payment data
3. Integrate with your payment provider (PayMaya, etc.)
4. Add form validation
5. Add error handling and loading states
6. Test on all target browsers and devices

## Questions?

For more details about the design, see the Figma link:
https://www.figma.com/design/NcMe5sSgPs65q3Ed2rV1Kv/DMCI-CRF---RA?node-id=174029-221884&m=dev
