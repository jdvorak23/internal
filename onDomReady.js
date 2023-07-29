const onDomReady = (callbackFn) => {
	if (document.readyState !== 'loading') {
		callbackFn();
	} else {
		document.addEventListener('DOMContentLoaded', callbackFn);
	}
};
export default onDomReady;
