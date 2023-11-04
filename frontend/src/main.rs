mod page;
use leptos::*;
use leptos_router::*;
use page::*;

fn main() {
    mount_to_body(|| view! { <App /> })
}

#[component]
fn App() -> impl IntoView {
    view! {
        <Router>
            <nav>
        <A href="/">Trash</A>
        <A href="/stats">Stats</A>
        <A href="/settings">Settings</A>
        </nav>
            <main>
                // all our routes will appear inside <main>
                <Routes>
                    <Route path="/" view=Trash/>
                    <Route path="/stats" view=Stats/>
                    <Route path="/settings" view=Settings/>
                    <Route path="/*any" view=|| view! { <h1>"Not Found"</h1> }/>
                </Routes>
            </main>
        </Router>
    }
}
