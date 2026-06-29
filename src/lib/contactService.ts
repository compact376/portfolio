export type ContactTransmission = {
    callSign: string;
    uplink: string;
    transmission: string;
};

const CONTACT_RECEIVER = "hemedihana005@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_RECEIVER}`;

export async function transmitContactMessage(payload: ContactTransmission) {
    const response = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: payload.callSign,
            email: payload.uplink,
            message: payload.transmission,
            _subject: `DGNUS Contact Transmission from ${payload.callSign || "Unknown Operator"}`,
            _template: "table",
            _captcha: false,
        }),
    });

    if (!response.ok) {
        const detail = await response.text().catch(() => "");
        throw new Error(detail || `Transmission failed with status ${response.status}`);
    }

    return response.json().catch(() => null);
}

