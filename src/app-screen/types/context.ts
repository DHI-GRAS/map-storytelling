export interface Viewport {
	latitude: number,
	longitude: number,
	zoom: number,
	bearing: number,
	pitch: number,
	transitionDuration: number,
	transitionInterpolator: any,
	transitionEasing: any,
}

export interface ContextState {
	isJourneyMode: boolean,
	viewport: Viewport,
	layers: any[],
	isButtonDisabled: boolean,
	activeStep: number | null,
}

export interface Context {
	state: ContextState,
	actions: any,
}
