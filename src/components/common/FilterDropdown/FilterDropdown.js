import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/**
 * Filter dropdown component for table.
 */
const FilterDropdown = (props) => (
    <div style={{ padding: 8 }}>
        <Input
            placeholder={props.placeholder}
            value={props.selectedKeys[0]}
            onChange={e => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
            <Button
                type="primary"
                onClick={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Поиск
            </Button>
            <Button onClick={() => props.handleReset(props.clearFilters)} size="small" style={{ width: 90 }}>
                Сбросить
            </Button>
        </Space>
    </div>
)

export default FilterDropdown