use leptos::*;

#[component]
pub fn Calendar() -> impl IntoView {
    view! {
        <button class="absolute right-[2rem] bottom-[calc(2rem+4rem)] lg:bottom-[calc(2rem)] btn lg-max:btn-square lg-max:hover:btn-circle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                ></path>
            </svg>
            <p class="inline lg-max:!hidden">Add a trash</p>
        </button>
    }
}

#[component]
pub fn Stats() -> impl IntoView {
    view! { <p class="text-red-600">"Stats"</p> }
}

#[component]
pub fn Settings() -> impl IntoView {
    view! { <p class="text-purple-500">"Settings"</p> }
}
