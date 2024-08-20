<script lang="ts">
    import { KButton, KMsgBox, KMessage, type NotifyComponent } from '@ikun-ui/core';
    import 'virtual:uno.css';
    let copyright = 'copyright@boycot ' + new Date().getFullYear();
    // let messageInstance: NotifyComponent | null | undefined = null;
    const onClick = () => {
        KMsgBox.confirm({
            title: '🎤 🐔 svelte for ikun-ui！',
            emoType: 'success',
            content: '别想了，这里啥也没有！',
            cancelBtnText: '取消',
            confirmBtnText: '确认',
            onCancel: () => {
                KMessage({
                    type: 'info',
                    close: false,
                    autoClose: true,
                    content: '你选择了下班'
                })
            },
            onConfirm: () => {
                KMessage({
                    type: 'success',
                    close: false,
                    autoClose: true,
                    content: '你选择了继续卷'
                })
            }
        })
    }
</script>
<div class="footer flex justify-between">
    <p class="text-center flex-1 m-0">{copyright}</p>
    <div class="link"><KButton on:click={() => onClick()}>点我有惊喜</KButton></div>
</div>