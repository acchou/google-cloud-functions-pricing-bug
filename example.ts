import { google } from "googleapis";
import * as util from "util";

async function initCloudBilling() {
    const auth = await google.auth.getClient({
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
    });
    google.options({ auth });
    return google.cloudbilling("v1");
}

async function example(region: string) {
    const cloudBilling = await initCloudBilling();
    const services = await cloudBilling.services.list();
    async function getPricing(
        serviceName: string,
        description: string,
        conversionFactor: number = 1
    ) {
        const service = services.data.services!.find(s => s.displayName === serviceName)!;
        const skusResponse = await cloudBilling.services.skus.list({
            parent: service.name
        });
        const { skus = [] } = skusResponse.data;
        const matchingSkus = skus.filter(sku => sku.description === description);
        console.log(`matching SKUs: ${util.inspect(matchingSkus, { depth: null })}`);

        const regionOrGlobalSku =
            matchingSkus.find(sku => sku.serviceRegions![0] === region) ||
            matchingSkus.find(sku => sku.serviceRegions![0] === "global");

        const pexp = regionOrGlobalSku!.pricingInfo![0].pricingExpression!;
        const prices = pexp.tieredRates!.map(
            rate => Number(rate.unitPrice!.units || "0") + rate.unitPrice!.nanos! / 1e9
        );
        const price =
            Math.max(...prices) * (conversionFactor / pexp.baseUnitConversionFactor!);
        console.log(
            `Found price for ${serviceName}, ${description}, ${region}: $${price}`
        );
        return price;
    }
    return getPricing("Cloud Functions", "Invocations");
}

example("us-west-1");
