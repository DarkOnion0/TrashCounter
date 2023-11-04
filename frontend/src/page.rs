use leptos::*;

#[component]
pub fn Trash() -> impl IntoView {
    view! { <p class="text-amber-600">"Trash"</p> }
}
#[component]
pub fn Stats() -> impl IntoView {
    view! { <p class="text-red-600">"Stats"</p> }
}
#[component]
pub fn Settings() -> impl IntoView {
    view! { <p class="text-purple-500">"Settings"</p> }
}
