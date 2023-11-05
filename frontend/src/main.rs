mod page;
use leptos::*;
use leptos_router::*;
use page::*;

fn main() {
    mount_to_body(|| view! { <App/> })
}

#[component]
fn App() -> impl IntoView {
    view! {
        <Router>
            <div class="flex flex-col-reverse lg:flex-col w-screen h-screen">
        <div class="tabs tabs-boxed w-fit mx-auto my-3">
                        <A class="tab" active_class="tab-active" href="/">
                            Calendar
                        </A>
                        <A class="tab" active_class="tab-active" href="/stats">
                           Stats
                        </A>
                        <A class="tab" active_class="tab-active" href="/settings">
                            Settings
                        </A>
    </div>
                <main class="grow">
                    // all our routes will appear inside <main>
                    <Routes>
                        <Route path="/" view=Calendar/>
                        <Route path="/stats" view=Stats/>
                        <Route path="/settings" view=Settings/>
                        <Route path="/*any" view=|| view! { <h1>"Not Found"</h1> }/>
                    </Routes>
                </main>
            </div>
        </Router>
    }
}
