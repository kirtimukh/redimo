import React, { useState } from 'react'
import { AGMini, AGInput } from './AGComponents';
import ActionGroupDetail from './ActionGroupDetail';
import { Tooltip } from 'react-tooltip'
import { fakeActionGroups } from '../../faked_data/actionGroups';


const XBoard = ({
    isDragging,
    parentSP,
    displayEventModal,
    contextProps
}) => {
    const [actionGroups, setActionGroups] = useState([]);
    const [lastGroupId, setLastGroupId] = useState(100);

    const [showAGIn, setShowAGIn] = useState(false);

    const showAGInputFn = (e) => {
        console.log('add button pressed');
        setShowAGIn(true);
        e.stopPropagation();
    }

    const removeActionGroup = (fieldno) => {
        setActionGroups(prevActionGroups => prevActionGroups.filter(actionGroup => actionGroup.fieldno !== fieldno));
    }

    const [showGroupDetail, setShowGroupDetail] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [groupDetails, setGroupDetails] = useState({});
    const showGroupDetailFn = (groupId) => {
        if (groupId === selectedGroupId) {
            return;
        }
        const actionGroup = fakeActionGroups[groupId];
        setGroupDetails({
            actionGroup,
            groupId
        });
        setShowGroupDetail(true);
        setSelectedGroupId(groupId);
    }

    return (
        <>
            <div className='flex gap-5'>
                <div className='basis-1/4'>
                    <div className="flex justify-between w-full top-0">
                        <div className='flex justify-between w-full'>
                            <h1 className="font-semibold">
                                Workspace
                            </h1>
                            <button
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Hello world!"
                                className="rounded-full text-xl h-6 w-6
                                    hover:bg-black hover:text-white
                                    leading-none"
                                onClick={(e) => showAGInputFn(e)}
                            >&#43;
                            </button>
                            <Tooltip id="my-tooltip" />
                        </div>
                    </div>
                    <div className='w-full flex-grow'>
                        {showAGIn && <AGInput dismissInput={() => setShowAGIn(false)} />}

                        {Object.values(fakeActionGroups).map(actionGroup => <AGMini key={actionGroup.id}
                            fieldno={actionGroup.id}
                            groupId={actionGroup.id}
                            name={actionGroup.name}
                            showGroupDetailFn={showGroupDetailFn}
                        />)}
                    </div>
                </div>
                <div className='basis-3/4'>
                    {showGroupDetail && <ActionGroupDetail
                        key={groupDetails.groupId}
                        remove={removeActionGroup}
                        groupId={groupDetails.groupId}
                        actionGroup={groupDetails.actionGroup}
                    />}
                </div>
            </div>
        </>
    )
}

export default XBoard