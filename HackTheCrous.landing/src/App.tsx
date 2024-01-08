import './App.css'
import logo from './assets/logo.png'
import Button from './components/Button'
import preview_image from './assets/preview.png'
import Preview from './components/Preview'

function App() {
  return (
    <>
      <div className='background'></div>
      <header className='flex-row flex justify-between px-5 py-3'>
        <img src={logo} alt='logo' width={58} height={50} />
        <span className='flex-row flex py-2 px-5'>
          <Button text="S'inscrire" type='primary' to='https://hack-the-crous-96y4.vercel.app/register' />
          <Button style='ml-4' text="Se connecter" type='secondary' to='https://hack-the-crous-96y4.vercel.app/login' />
        </span>
      </header>
      <section id="hero" className='flex flex-col w-full justify-center items-center h-[75vh]'>
        <p className='text-primary font-medium border-1 border-white rounded-full w-fit px-3 pb-[0.5px]'>BETA</p>
        <h1 className='text-stroke-3 stroke-primary font-grotesk text-primary text-3xl my-5'>HACK THE CROUS</h1>
        <h2 className='text-7xl text-center w-3/4 text-primary font-clean font-extrabold mb-5'>
          Ton <span className='text-accent'>intranet</span> <br/>étudiant <span className='text-accent'>réinventé</span>
        </h2>
        <p className='text-primary font-neutral font-medium text-2xl mt-4 w-1/2 text-center'>Trouve ton <u>emploi du temps</u>, les <u>menus</u> du crous, tes <u>salles de cours</u> sur la même plateforme.</p>
        <Button style='mt-8 text-3xl' text='Rejoindre Hack The Crous' type='primary' to='https://hack-the-crous-96y4.vercel.app/register' />
      </section>^^
      <section className='w-full flex flex-col items-center justify-center'>
        <Preview image={preview_image} />
      </section>
      <footer className='flex flex-row items-center justify-center w-full pt-24 pb-10'>
        <p className='text-primary opacity-75 hover:opacity-100 font-clean mx-3'>All right reserved - Hack The Crous 2024</p>
      </footer>
    </>
  )
}

export default App
