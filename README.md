# Example of Google Billing API bug for Cloud Functions

## Prerequisites

A working Google Cloud account with `GOOGLE_APPLICATION_CREDENTIALS` environment variable set. (https://cloud.google.com/docs/authentication/getting-started)

## Build

```bash
$ yarn install
$ yarn build
```

npm should also work but hasn't been tested.

## Run example

```
$ node build/example.js
```

## Output

```
matching SKUs: [ { name: 'services/29E7-DA93-CA13/skus/8E10-82EB-6917',
    skuId: '8E10-82EB-6917',
    description: 'Invocations',
    category:
     { serviceDisplayName: 'Cloud Functions',
       resourceFamily: 'ApplicationServices',
       resourceGroup: 'Functions',
       usageType: 'OnDemand' },
    serviceRegions: [ 'global' ],
    pricingInfo:
     [ { summary: '',
         pricingExpression:
          { usageUnit: 'count',
            usageUnitDescription: 'count',
            baseUnit: 'count',
            baseUnitDescription: 'count',
            baseUnitConversionFactor: 1,
            displayQuantity: 1000000,
            tieredRates:
             [ { startUsageAmount: 0,
                 unitPrice: { currencyCode: 'USD', units: '0', nanos: 0 } },
               { startUsageAmount: 2000000,
                 unitPrice: { currencyCode: 'USD', units: '0', nanos: 0 } } ] },
         aggregationInfo:
          { aggregationLevel: 'ACCOUNT',
            aggregationInterval: 'MONTHLY',
            aggregationCount: 1 },
         currencyConversionRate: 1,
         effectiveTime: '2018-10-19T12:58:54.453Z' } ],
    serviceProviderName: 'Google' } ]
Found price for Cloud Functions, Invocations, us-west-1: $0
```

This used to return the same value on the public facing pricing page (https://cloud.google.com/functions/pricing) of $0.40/million invocations. Now, it shows $0. The change occurred probably in the past few weeks, and possibly in the past few days.
