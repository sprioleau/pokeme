export const formatFeet = (value) => `${value.toString()} ft.`;
export const formatInches = (value) => `${value.toString()} in.`;
export const formatWeight = (value) => `${value.toString()} lbs.`;

export const convertAnatomySpecToNumber = (value) => {
	if (typeof value === "string") return parseInt(value.replace(" ft.", "").replace(" in.", "").replace(" lbs.", ""), 10);
	return value;
};
