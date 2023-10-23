export default function redirectToPrevius(history: any) {
    const redirect = localStorage.getItem('redirectToken') || `/LandingPage`
    history.push(redirect)
    localStorage.removeItem('redirectToken')
}