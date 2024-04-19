# Notes

1. The background color of [`<Theme>`](https://react.carbondesignsystem.com/?path=/docs/components-theme--overview) is white when the `theme` property is set to `white`. Since the background of screenshots in `docs` are all white, I chose to replace `<Theme theme="g10">` with `<Theme theme="white">`

   - Texts in UIHeader and side-nav are also effected by this change. Here's a screenshot showing the theme change from `g10` to `white` without further modifications.

     ![uiheader-in-white-theme](https://github.com/bigstack-oss/interview-assignment/assets/59676941/5277183b-2f15-495f-baa1-e788c12b5d9e)

     We could use CSS to overwrite the color of the texts in these areas, but as a simpler solution, I just change the background color of UIHeader and side-nav to white.

2. Screenshot [`it-overflow.png`](./docs/it-overflow.png) appears to show a menu styled more like a [Toggletip](https://react.carbondesignsystem.com/?path=/story/components-toggletip--default&globals=theme:g10), while the requirement specifies using [OverflowMenu](https://react.carbondesignsystem.com/?path=/story/components-overflowmenu--default&globals=theme:g10), which has a different visual style.

   - Unlike Toggletip, OverflowMenu doesn't have an `autoAlign` property. This means the content might overflow the viewport and become hidden, or potentially leading to an unwanted scrollbar.

   - The position of the overflow menu is controlled by the library, making it necessary to explore options beyond pure CSS to completely replicate the design from the screenshot.

3. Documentation describes the `className` property of [TextInput](https://react.carbondesignsystem.com/?path=/docs/components-textinput--overview) as "Specify an optional className to be applied to the `<input>` node", but the class is actually applied to the wrapper of the `<input>` (`.cds--text-input-wrapper`). The same problem also applies to [Search](https://react.carbondesignsystem.com/?path=/docs/components-search--overview) (better check all components with an input).

4. Regarding table filtering:

   - The requirement specifies "The filter options in these dropdowns should be dynamically generated from table data." This approach might not be ideal for status options. In real-world scenarios, all possible statuses are typically predefined and included in the dropdown for selection. Generating all status options from the table data would limit us to searching only within existing entries, which becomes problematic for functionalities like pagination.

   - Including both an input field and checkboxes for status filtering seems redundant. A menu with only checkboxes would be a more reasonable approach.

5. Currently [MenuButton](https://react.carbondesignsystem.com/?path=/docs/components-menubutton--overview) is used as the filter menu for status and owner. However, the following error will be thrown whenever a key is pressed:

```
Menu.js:156 Uncaught TypeError: Cannot read properties of undefined (reading 'ref')
    at focusItem (Menu.js:156:1)
    at handleKeyDown (Menu.js:129:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:4164:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:4213:1)
    at invokeGuardedCallback (react-dom.development.js:4277:1)
    at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:4291:1)
    at executeDispatch (react-dom.development.js:9041:1)
    at processDispatchQueueItemsInOrder (react-dom.development.js:9073:1)
    at processDispatchQueue (react-dom.development.js:9086:1)
    at dispatchEventsForPlugins (react-dom.development.js:9097:1)
```

This error occurs because `MenuButton` expects its children to be `MenuItem`. When a key is pressed, it attempts to focus on the first non-disabled `MenuItem`. Since our filter menu doesn't use `MenuItem` as its children, this behavior leads to the error shown above. Unfortunately, there's no option on `MenuButton` that can disable this behavior. To address this, we should likely implement a custom component that caters to our specific needs.
