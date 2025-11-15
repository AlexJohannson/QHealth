from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer

from apps.diagnostics.models import DiagnosticsModel
from apps.diagnostics.serializer import DiagnosticsSerializer


class DiagnosticsConsumer(GenericAsyncAPIConsumer):
    def __init__(self, *args, **kwargs):
        self.group = 'diagnostics'
        super().__init__(*args, **kwargs)

    async def connect(self):
        print(">>> CONNECT CALLED")
        print(">>> USER:", self.scope.get("user"))

        if not self.scope['user']:
            return await self.close()

        await self.accept()
        await self.channel_layer.group_add(self.group, self.channel_name)


    @model_observer(DiagnosticsModel, serializer_class=DiagnosticsSerializer)
    async def diagnostics_model_activity(self, message, action, subscribing_request_ids, **kwargs):
        for request_id in subscribing_request_ids:
            await self.reply(data=message, action=action, request_id=request_id)


    @action()
    async def subscribe_to_diagnostics_model_changes(self, request_id, **kwargs):
        await self.diagnostics_model_activity.subscribe(request_id=request_id)




