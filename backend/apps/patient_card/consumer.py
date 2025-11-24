from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer

from apps.patient_card.models import PatientCardModel
from apps.patient_card.serializer import PatientCardSerializer


class PatientCardConsumer(GenericAsyncAPIConsumer):
    def __init__(self, *args, **kwargs):
        self.group = 'patient_card'
        super().__init__(*args, **kwargs)

    async def connect(self):
        if not self.scope['user']:
            return await self.close()

        await self.accept()
        await self.channel_layer.group_add(self.group, self.channel_name)

    @model_observer(PatientCardModel, serializer_class=PatientCardSerializer)
    async def patient_card_model_activity(self, message, action, subscribing_request_ids, **kwargs):
        for request_id in subscribing_request_ids:
            await self.reply(data=message, action=action, request_id=request_id)

    @action()
    async def subscribe_to_patient_card_model_changes(self, request_id, **kwargs):
        await self.patient_card_model_activity.subscribe(request_id=request_id)