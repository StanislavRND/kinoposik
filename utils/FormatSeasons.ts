export function formatSeasons(seasonCount: number) {

	const lastDigit = seasonCount % 10; 
	const lastTwoDigits = seasonCount % 100; 

	if (lastDigit === 1 && lastTwoDigits !== 11) {
			return `${seasonCount} сезон`; 
	} else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
			return `${seasonCount} сезона`;
	} else {
			return `${seasonCount} сезонов`;
	}
}