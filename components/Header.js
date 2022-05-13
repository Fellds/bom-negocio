import Link from 'next/link'
import { useRouter } from "next/router";
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"

function Header() {

    const router = useRouter();
    const { data: session, status } = useSession();

    return (
        <header className="bg-white border-b border-slate-200 border-solid mb-4">
            <div className="max-w-screen-xl mx-auto flex w-full justify-between items-center p-2">
                <Link href="/">
                    <a>
                        <Image width={84} height={41} src="https://www.vvale.com.br/fmverdevale/wp-content/themes/verdevale/img/logo.png" />
                    </a>
                </Link>
                <nav>
                    <ul className="flex gap-4 font-bold">
                        <li><Link href="/"><a className={router.pathname == "/" ? "text-lime-600" : ""}>anúncios</a></Link></li>
                        <li><Link href="/classifieds/create"><a className={router.pathname == "/classifieds/create" ? "text-lime-600" : ""}>criar anúncio</a></Link></li>
                        {!session && status == 'loading' && (
                            <li><a>...</a></li>
                        )}
                        {!session && status != 'loading' && (
                            <li><a onClick={() => signIn()}>entrar</a></li>
                        )}
                        {session && (
                            <>
                                <li><Link href="/classifieds"><a className={router.pathname == "/classifieds" ? "text-lime-600" : ""}>meus classificados</a></Link></li>
                                <li><Link href="/"><a className='lowercase'>{session.user.name}</a></Link></li>
                                <li><Link href="/"><a onClick={() => signOut()}>sair</a></Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header