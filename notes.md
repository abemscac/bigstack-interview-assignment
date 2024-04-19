# Notes

1. The background color of [`<Theme>`](https://react.carbondesignsystem.com/?path=/docs/components-theme--overview) is white when the `theme` property is set to `white`. Since the background of screenshots in `docs` are all white, I chose to replace `<Theme theme="g10">` with `<Theme theme="white">`

   - Texts in UIHeader and side-nav are also effected by this change. Here's a screenshot showing the theme change from `g10` to `white` without further modifications.

     ![uiheader-in-white-theme](https://github.com/bigstack-oss/interview-assignment/assets/59676941/5277183b-2f15-495f-baa1-e788c12b5d9e)

     We could use CSS to overwrite the color of the texts in these areas, but as a simpler solution, I just change the background color of UIHeader and side-nav to white.

2. Screenshot [`it-overflow.png`](./docs/it-overflow.png) appears to show a menu styled more like a [Toggletip](https://react.carbondesignsystem.com/?path=/story/components-toggletip--default&globals=theme:g10), while the requirement specifies using [OverflowMenu](https://react.carbondesignsystem.com/?path=/story/components-overflowmenu--default&globals=theme:g10), which has a different visual style.

   - Unlike Toggletip, OverflowMenu doesn't have an `autoAlign` property. This means the content might overflow the viewport and become hidden, or potentially leading to an unwanted scrollbar.

   - The position of the overflow menu is controlled by the library, making it necessary to explore options beyond pure CSS to completely replicate the design from the screenshot.

3. Documentation describes the `className` property of [TextInput](https://react.carbondesignsystem.com/?path=/docs/components-textinput--overview) as "Specify an optional className to be applied to the `<input>` node", but the class is actually applied to the wrapper of the `<input>` (`.cds--text-input-wrapper`).
