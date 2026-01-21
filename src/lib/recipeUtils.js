/**
 * Parses a time string (e.g. "40 min", "1h 30m") into ISO 8601 duration format (PT1H30M).
 * @param {string} timeString 
 * @returns {string|undefined} ISO 8601 duration string or undefined if invalid
 */
export function parseDuration(timeString) {
    if (!timeString) return undefined;

    const str = timeString.toString().toLowerCase();
    let totalMinutes = 0;

    // Regex to find all time parts: number followed by unit
    // Matches: 30m, 30 min, 30 minuti, 1h, 1 ora, 1 ore
    const regex = /(\d+)\s*(h|ora|ore|hour|hours|m|min|minuti|minutes)/g;

    let match;
    let found = false;

    while ((match = regex.exec(str)) !== null) {
        found = true;
        const value = parseInt(match[1], 10);
        const unit = match[2];

        if (unit.startsWith('h') || unit.startsWith('o')) {
            totalMinutes += value * 60;
        } else if (unit.startsWith('m')) {
            totalMinutes += value;
        }
    }

    if (!found) return undefined;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let iso = 'PT';
    if (hours > 0) iso += `${hours}H`;
    if (minutes > 0) iso += `${minutes}M`;

    return iso === 'PT' ? undefined : iso;
}
