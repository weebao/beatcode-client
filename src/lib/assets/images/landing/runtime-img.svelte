<script lang="ts">
    interface Props {
        class?: string;
    }

    let { class: className = "" }: Props = $props();
</script>

<svg
    class={className}
    width="56"
    height="53"
    viewBox="0 0 56 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g clip-path="url(#clip0_632_746)">
        <line
            x1="28.4717"
            y1="4.13697e-08"
            x2="28.4717"
            y2="53"
            stroke="#F5F8F5"
            stroke-width="2"
        />
        <line x1="56" y1="40" x2="-9.23712e-08" y2="40" stroke="#F5F8F5" stroke-width="2" />
        <path
            d="M0 39.5H20.0755C31.1698 39.5 36.4528 34 37.5094 -14"
            stroke="#ADEBB3"
            stroke-width="2"
            stroke-linecap="round"
        />
    </g>
    <defs>
        <clipPath id="clip0_632_746">
            <rect width="56" height="53" fill="white" />
        </clipPath>
    </defs>
</svg>
