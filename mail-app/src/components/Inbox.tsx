import { useState } from "react";
import MsgList from "./MsgList";


export default function Inbox(props: any) {
    const [orderBy, setOrderBy] = useState("data");
    const [inputSearch, setInputSearch] = useState("");

    return (
        <main className="w-4/6 mt-5 m-auto">
            <section>
                <div className="rounded border border-gray-300 p-3">
                    <div className="mx-3">
                        <header className="mb-2 grid-cols-3 grid">
                            <div>
                                <p className="text-2xl font-semibold">Inbox</p>
                                <p className="font-normal text-gray-400">100 messages</p>
                            </div>
                            <div className="text-right mx-8 col-span-2 my-auto">
                                <label htmlFor="search-input" className="text-xs">SEARCH</label>
                                <input id="search-input" type="text" placeholder="Search..."
                                    className="border-2 rounded-lg px-2 mr-4" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}></input>

                                <label htmlFor="select" className="text-xs">ORDER BY</label>
                                <select value={orderBy} onChange={(e) => {setOrderBy(e.target.value)}} id="select" className="border-2 rounded-[10px]">
                                    <option value="data">date</option>
                                    <option value="assunto">subject</option>
                                </select>
                            </div>
                        </header>
                        <MsgList usuario={props.usuario} orderby={orderBy} search={inputSearch} />
                    </div>
                </div>
            </section>
        </main>
    )
}