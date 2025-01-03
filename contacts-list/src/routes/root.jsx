import { 
    Outlet,
    NavLink,
    Link,
    useLoaderData,
    Form,
    useNavigation,
} from "react-router-dom";
import {getContacts, createContact } from "../contacts";

export async function action() {
    const contact = await createContact();
    return { contact };
}

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

export default function Root() {
    const { contacts } = useLoaderData();
    const navigation = useNavigation();
    
    return (
        <>
        <div id="sidebar">
            <h1>React Router Contacts</h1>
            <div>
                <Form method="post">
                    <button type="submit">New</button>
                </Form>
                <form id="search-form" role="search">
                    <input 
                      id="q"
                      aria-label="Search contacts"
                      placeholder="search"
                      name="q"
                    />
                    <div 
                        id="search-spinner"
                        aria-hidden
                        hidden={true}
                    />
                    <div 
                       className="sr-only"
                       aria-live="polite" 
                    ></div>
                </form>
                <form method="post">
                    <button type="submit">New</button>
                </form>
            </div>
            <nav>
                {contacts.length ? (
                    <ul>
                        {contacts.map((contact) => (
                            <li key={contact.id}>
                                <NavLink
                                    to="{`contacts/${contact.id}`}"
                                    className={({ isActive, isPending }) => 
                                    isActive
                                        ? "active"
                                        : isPending
                                        ? "pending"
                                        :""
                                    }
                                >
{contact.first || contact.last ? (
                                    <>
                                        {contact.first} {contact.last}
                                    </>
                                ) : (
                                    <i>No Name</i>
                                )}{" "}
                                {contact.favorite && <span>★</span>}

                                </NavLink>
                            <Link to={`contacts/${contacts.id}`}>
                                
                            </Link>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <p>
                        <i>No contacts</i>
                    </p>
                )}
            </nav>
                <ul>
                    <li>
                        <Link to={`/contacts/1`}>Your Name</Link>
                    </li>
                    <li>
                        <Link to={`/contacts/2`}>Your Friend</Link>
                    </li>
                </ul>
        </div>
        <div 
        id="detail"
        className={
            navigation.state === "loading" ? "loading" : ""
        }
        >
            <Outlet />
        </div>
        </>
    );
}